/**
 * Handles streaming prompt commands from a source observable, running them through an interactive session engine,
 * and yielding session events/results as they occur. Only 'prompt' commands are supported in streaming mode.
 *
 * @param {AsyncIterable<Object>} sourceObservable - Async iterable of incoming message objects to process.
 * @param {Object} permissionContext - Context for permission handling and user identity.
 * @param {Object} mcpClients - Clients for multi-client processing (MCP) operations.
 * @param {Array<Object>} availableCommands - List of available command definitions.
 * @param {Array<Object>} toolList - List of available tools for the session.
 * @param {Array<Object>} initialMessages - Initial messages to seed the session with.
 * @param {string} permissionPromptTool - Tool used for permission prompts.
 * @param {Object} sessionOptions - Options for session behavior (verbose, maxTurns, userSpecifiedModel, systemPrompt, appendSystemPrompt).
 * @returns {F0A} An async iterable (F0A instance) that yields session events/results as they are produced.
 */
function streamPromptSession(
  sourceObservable,
  permissionContext,
  mcpClients,
  availableCommands,
  toolList,
  initialMessages,
  permissionPromptTool,
  sessionOptions
) {
  let queuedPrompts = [];

  /**
   * Returns the current queue of prompt commands.
   * @returns {Array<Object>}
   */
  const getQueuedPrompts = () => queuedPrompts;

  /**
   * Removes the specified prompts from the queue.
   * @param {Array<Object>} promptsToRemove
   */
  const removeQueuedPrompts = promptsToRemove => {
    queuedPrompts = queuedPrompts.filter(prompt => !promptsToRemove.includes(prompt));
  };

  let isProcessing = false;
  let isSourceComplete = false;
  const sessionStream = new F0A();
  const initialSessionMessages = u_2(initialMessages);

  /**
   * Processes the queued prompt commands by running them through the interactive session engine.
   * Only processes 'prompt' commands. Yields session events to the sessionStream.
   */
  const processQueuedPrompts = async () => {
    isProcessing = true;
    try {
      while (queuedPrompts.length > 0) {
        const promptCommand = queuedPrompts.shift();
        if (promptCommand.mode !== "prompt") {
          throw new Error("only prompt commands are supported in streaming mode");
        }
        const promptValue = promptCommand.value;
        // Run the interactive session for this prompt, yielding events as they occur
        for await (const sessionEvent of runInteractiveSession({
          commands: availableCommands,
          prompt: promptValue,
          cwd: zU5(),
          tools: toolList,
          permissionContext: permissionContext,
          verbose: sessionOptions.verbose,
          mcpClients: mcpClients,
          maxTurns: sessionOptions.maxTurns,
          permissionPromptTool: permissionPromptTool,
          userSpecifiedModel: sessionOptions.userSpecifiedModel,
          initialMessages: initialSessionMessages,
          customSystemPrompt: sessionOptions.systemPrompt,
          appendSystemPrompt: sessionOptions.appendSystemPrompt,
          getQueuedCommands: getQueuedPrompts,
          removeQueuedCommands: removeQueuedPrompts
        })) {
          initialSessionMessages.push(sessionEvent);
          sessionStream.enqueue(sessionEvent);
        }
      }
    } finally {
      isProcessing = false;
    }
    // If the source is complete and nothing is processing, close the stream
    if (isSourceComplete) {
      sessionStream.done();
    }
  };

  // Start processing the source observable asynchronously
  (async () => {
    for await (const messageEnvelope of sourceObservable) {
      let promptText;
      // Extract the prompt text from the message content
      if (typeof messageEnvelope.message.content === "string") {
        promptText = messageEnvelope.message.content;
      } else {
        if (messageEnvelope.message.content.length !== 1) {
          console.error(`Error: Expected message content to have exactly one item, got ${messageEnvelope.message.content.length}`);
          process.exit(1);
        }
        if (typeof messageEnvelope.message.content[0] === "string") {
          promptText = messageEnvelope.message.content[0];
        } else if (messageEnvelope.message.content[0].type === "text") {
          promptText = messageEnvelope.message.content[0].text;
        } else {
          console.error("Error: Expected message content to be a string or a text block.");
          process.exit(1);
        }
      }
      // Queue the prompt command
      queuedPrompts.push({
        mode: "prompt",
        value: promptText
      });
      // If not already processing, start processing the queue
      if (!isProcessing) {
        processQueuedPrompts();
      }
    }
    // Mark source as complete and close the stream if not processing
    isSourceComplete = true;
    if (!isProcessing) {
      sessionStream.done();
    }
  })();

  return sessionStream;
}

module.exports = streamPromptSession;