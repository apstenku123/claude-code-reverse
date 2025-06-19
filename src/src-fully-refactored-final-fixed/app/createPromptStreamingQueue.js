/**
 * Handles a streaming queue of prompt commands, processing them asynchronously and yielding results via an event queue.
 *
 * @param {AsyncIterable<Object>} messageStream - Async iterable of incoming message objects to process as prompts.
 * @param {Object} permissionContext - Context object for permission management.
 * @param {Object} mcpClients - Multi-client provider clients for session management.
 * @param {Array<Object>} commandList - List of available commands for the session.
 * @param {Array<Object>} toolList - List of available tools for the session.
 * @param {Array<Object>} initialMessages - Initial message history for the session.
 * @param {Object} permissionPromptTool - Tool used for permission prompts.
 * @param {Object} sessionOptions - Options for session behavior (verbose, maxTurns, userSpecifiedModel, systemPrompt, etc.).
 * @returns {Object} An event queue (F0A instance) that yields results as prompts are processed.
 */
function createPromptStreamingQueue(
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

  // Helper to get the current prompt queue
  const getQueuedCommands = () => promptQueue;

  // Helper to remove specific commands from the queue
  const removeQueuedCommands = commandsToRemove => {
    promptQueue = promptQueue.filter(cmd => !commandsToRemove.includes(cmd));
  };

  // Indicates if a prompt is currently being processed
  let isProcessing = false;

  // Indicates if the input stream has ended
  let isInputClosed = false;

  // Event queue for yielding results
  const eventQueue = new F0A();

  // Clone of the initial message history for each session
  const messageHistory = u_2(initialMessages);

  /**
   * Asynchronously processes the prompt queue, yielding results to the event queue.
   */
  const processPromptQueue = async () => {
    isProcessing = true;
    try {
      // Process all queued prompts
      while (promptQueue.length > 0) {
        const promptCommand = promptQueue.shift();
        if (promptCommand.mode !== "prompt") {
          throw new Error("only prompt commands are supported in streaming mode");
        }
        const promptText = promptCommand.value;
        // Run the interactive session for this prompt
        for await (const event of runInteractiveSession({
          commands: commandList,
          prompt: promptText,
          cwd: zU5(),
          tools: toolList,
          permissionContext: permissionContext,
          verbose: sessionOptions.verbose,
          mcpClients: mcpClients,
          maxTurns: sessionOptions.maxTurns,
          permissionPromptTool: permissionPromptTool,
          userSpecifiedModel: sessionOptions.userSpecifiedModel,
          initialMessages: messageHistory,
          customSystemPrompt: sessionOptions.systemPrompt,
          appendSystemPrompt: sessionOptions.appendSystemPrompt,
          getQueuedCommands,
          removeQueuedCommands
        })) {
          // Add event to message history and enqueue for consumers
          messageHistory.push(event);
          eventQueue.enqueue(event);
        }
      }
    } finally {
      isProcessing = false;
    }
    // If input is closed and nothing is processing, mark the queue as done
    if (isInputClosed) {
      eventQueue.done();
    }
  };

  // Start processing incoming messages
  (async () => {
    for await (const messageEvent of messageStream) {
      let promptText;
      // Extract the prompt text from the message content
      if (typeof messageEvent.message.content === "string") {
        promptText = messageEvent.message.content;
      } else {
        if (messageEvent.message.content.length !== 1) {
          console.error(
            `Error: Expected message content to have exactly one item, got ${messageEvent.message.content.length}`
          );
          process.exit(1);
        }
        if (typeof messageEvent.message.content[0] === "string") {
          promptText = messageEvent.message.content[0];
        } else if (messageEvent.message.content[0].type === "text") {
          promptText = messageEvent.message.content[0].text;
        } else {
          console.error("Error: Expected message content to be a string or a text block.");
          process.exit(1);
        }
      }
      // Add the prompt to the queue
      promptQueue.push({ mode: "prompt", value: promptText });
      // If not already processing, start processing the queue
      if (!isProcessing) {
        processPromptQueue();
      }
    }
    // Mark input as closed
    isInputClosed = true;
    // If not processing, mark the event queue as done
    if (!isProcessing) {
      eventQueue.done();
    }
  })();

  // Return the event queue for consumers
  return eventQueue;
}

module.exports = createPromptStreamingQueue;
