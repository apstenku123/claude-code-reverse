/**
 * Handles a queue of prompt commands, processes them in a streaming interactive session,
 * and exposes a stream of session events. New prompts can be queued as they arrive from an async source.
 *
 * @param {AsyncIterable<Object>} promptSource - Async iterable yielding prompt message objects to process.
 * @param {Object} permissionContext - Context object for permission handling in the session.
 * @param {Object} mcpClients - MCP client instances for session use.
 * @param {Array<Object>} commandList - List of available commands for the session.
 * @param {Array<Object>} toolList - List of tools available for the session.
 * @param {Array<Object>} initialMessages - Initial messages for the session context.
 * @param {Object} permissionPromptTool - Tool used for permission prompts.
 * @param {Object} sessionOptions - Additional session options (verbose, maxTurns, userSpecifiedModel, systemPrompt, appendSystemPrompt).
 * @returns {Object} - An async iterable stream of session events.
 */
function queuePromptSessionStream(
  promptSource,
  permissionContext,
  mcpClients,
  commandList,
  toolList,
  initialMessages,
  permissionPromptTool,
  sessionOptions
) {
  // Queue of prompt commands to process
  let promptQueue = [];

  // Helper to get the current queue (used by session runner)
  const getQueuedCommands = () => promptQueue;

  // Helper to remove commands from the queue
  const removeQueuedCommands = commandsToRemove => {
    promptQueue = promptQueue.filter(cmd => !commandsToRemove.includes(cmd));
  };

  // Indicates if a session is currently running
  let isSessionRunning = false;
  // Indicates if the prompt source is fully consumed
  let isSourceComplete = false;

  // Output stream for session events
  const sessionEventStream = new F0A();

  // Clone of initial messages for each session
  const sessionInitialMessages = u_2(initialMessages);

  /**
   * Processes the prompt queue in a streaming session, yielding events as they arrive.
   * Runs until the queue is empty.
   */
  const processPromptQueue = async () => {
    isSessionRunning = true;
    try {
      while (promptQueue.length > 0) {
        const queuedCommand = promptQueue.shift();
        if (queuedCommand.mode !== "prompt") {
          throw new Error("only prompt commands are supported in streaming mode");
        }
        const promptValue = queuedCommand.value;
        // Run the interactive session for this prompt
        for await (const sessionEvent of runInteractiveSession({
          commands: commandList,
          prompt: promptValue,
          cwd: zU5(),
          tools: toolList,
          permissionContext: permissionContext,
          verbose: sessionOptions.verbose,
          mcpClients: mcpClients,
          maxTurns: sessionOptions.maxTurns,
          permissionPromptTool: permissionPromptTool,
          userSpecifiedModel: sessionOptions.userSpecifiedModel,
          initialMessages: sessionInitialMessages,
          customSystemPrompt: sessionOptions.systemPrompt,
          appendSystemPrompt: sessionOptions.appendSystemPrompt,
          getQueuedCommands,
          removeQueuedCommands
        })) {
          // Add event to initial messages and enqueue to output stream
          sessionInitialMessages.push(sessionEvent);
          sessionEventStream.enqueue(sessionEvent);
        }
      }
    } finally {
      isSessionRunning = false;
    }
    // If the source is done and no session is running, close the stream
    if (isSourceComplete) {
      sessionEventStream.done();
    }
  };

  // Main async function to consume promptSource and queue prompts
  (async () => {
    for await (const messageObj of promptSource) {
      let promptText;
      // Extract the prompt text from the message object
      if (typeof messageObj.message.content === "string") {
        promptText = messageObj.message.content;
      } else {
        if (messageObj.message.content.length !== 1) {
          console.error(
            `Error: Expected message content to have exactly one item, got ${messageObj.message.content.length}`
          );
          process.exit(1);
        }
        if (typeof messageObj.message.content[0] === "string") {
          promptText = messageObj.message.content[0];
        } else if (messageObj.message.content[0].type === "text") {
          promptText = messageObj.message.content[0].text;
        } else {
          console.error("Error: Expected message content to be a string or a text block.");
          process.exit(1);
        }
      }
      // Queue the prompt command
      promptQueue.push({ mode: "prompt", value: promptText });
      // If no session is running, start processing the queue
      if (!isSessionRunning) {
        processPromptQueue();
      }
    }
    // Mark the source as complete
    isSourceComplete = true;
    // If no session is running, close the stream
    if (!isSessionRunning) {
      sessionEventStream.done();
    }
  })();

  // Return the event stream
  return sessionEventStream;
}

module.exports = queuePromptSessionStream;