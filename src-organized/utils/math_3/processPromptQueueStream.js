/**
 * Processes a stream of prompt messages, queues them, and runs them through an interactive session handler.
 * Supports streaming results and manages session state, queue, and completion.
 *
 * @param {AsyncIterable<Object>} messageStream - Async iterable of incoming message objects to process.
 * @param {Object} permissionContext - Context object for permission handling.
 * @param {Object} mcpClients - Clients for multi-client processing.
 * @param {Array} commandList - List of available commands for the session.
 * @param {Array} toolList - List of tools available for the session.
 * @param {Array} initialMessages - Initial messages for the session context.
 * @param {string} permissionPromptTool - Tool to use for permission prompts.
 * @param {Object} sessionOptions - Additional session options (verbose, maxTurns, userSpecifiedModel, systemPrompt, appendSystemPrompt).
 * @returns {Object} An async iterable (queue) of session events/results.
 */
function processPromptQueueStream(
  messageStream,
  permissionContext,
  mcpClients,
  commandList,
  toolList,
  initialMessages,
  permissionPromptTool,
  sessionOptions
) {
  // Queue of pending prompt commands
  let promptQueue = [];

  // Helper to get the current queue (used by session handler)
  const getQueuedCommands = () => promptQueue;

  // Helper to remove commands from the queue
  const removeQueuedCommands = commandsToRemove => {
    promptQueue = promptQueue.filter(cmd => !commandsToRemove.includes(cmd));
  };

  // Indicates if a session is currently running
  let isSessionActive = false;
  // Indicates if the input stream is finished
  let isInputComplete = false;

  // Output queue for streaming session events/results
  const outputQueue = new F0A();

  // Clone the initial messages array for session context
  const sessionMessages = u_2(initialMessages);

  /**
   * Runs the interactive session for all queued prompts.
   * Streams results to the output queue.
   */
  const runSession = async () => {
    isSessionActive = true;
    try {
      // Process all queued prompts
      while (promptQueue.length > 0) {
        const queuedCommand = promptQueue.shift();
        if (queuedCommand.mode !== "prompt") {
          throw new Error("only prompt commands are supported in streaming mode");
        }
        const promptText = queuedCommand.value;
        // Run the interactive session and stream results
        for await (const sessionEvent of runInteractiveSession({
          commands: commandList,
          prompt: promptText,
          cwd: zU5(),
          tools: toolList,
          permissionContext,
          verbose: sessionOptions.verbose,
          mcpClients,
          maxTurns: sessionOptions.maxTurns,
          permissionPromptTool,
          userSpecifiedModel: sessionOptions.userSpecifiedModel,
          initialMessages: sessionMessages,
          customSystemPrompt: sessionOptions.systemPrompt,
          appendSystemPrompt: sessionOptions.appendSystemPrompt,
          getQueuedCommands,
          removeQueuedCommands
        })) {
          sessionMessages.push(sessionEvent);
          outputQueue.enqueue(sessionEvent);
        }
      }
    } finally {
      isSessionActive = false;
    }
    // If input is complete and no session is running, close the output queue
    if (isInputComplete) {
      outputQueue.done();
    }
  };

  // Start processing the input message stream
  (async () => {
    for await (const incomingMessage of messageStream) {
      let promptText;
      // Extract the prompt text from the message content
      if (typeof incomingMessage.message.content === "string") {
        promptText = incomingMessage.message.content;
      } else {
        if (incomingMessage.message.content.length !== 1) {
          console.error(
            `Error: Expected message content to have exactly one item, got ${incomingMessage.message.content.length}`
          );
          process.exit(1);
        }
        if (typeof incomingMessage.message.content[0] === "string") {
          promptText = incomingMessage.message.content[0];
        } else if (incomingMessage.message.content[0].type === "text") {
          promptText = incomingMessage.message.content[0].text;
        } else {
          console.error(
            "Error: Expected message content to be a string or a text block."
          );
          process.exit(1);
        }
      }
      // Add the prompt to the queue
      promptQueue.push({
        mode: "prompt",
        value: promptText
      });
      // If no session is running, start one
      if (!isSessionActive) {
        runSession();
      }
    }
    // Mark input as complete and close output if no session is running
    isInputComplete = true;
    if (!isSessionActive) {
      outputQueue.done();
    }
  })();

  // Return the output queue for consumers to read session events/results
  return outputQueue;
}

module.exports = processPromptQueueStream;