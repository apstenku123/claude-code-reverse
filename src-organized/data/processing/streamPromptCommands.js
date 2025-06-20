/**
 * Streams prompt commands from an async iterable of messages, queues them, and processes them sequentially.
 * Only supports commands of mode 'prompt' in streaming mode. Handles streaming results via an async queue.
 *
 * @param {AsyncIterable<Object>} messageStream - Async iterable of message objects to process.
 * @param {Object} permissionContext - Context object for permissions.
 * @param {Object} mcpClients - Clients for multi-command processing.
 * @param {Array} availableCommands - List of available commands.
 * @param {Array} toolList - List of tools to use.
 * @param {string} permissionPromptTool - Tool used for permission prompts.
 * @param {Object} initialMessages - Initial messages for the session.
 * @param {Object} options - Additional options (verbose, maxTurns, userSpecifiedModel, systemPrompt, appendSystemPrompt).
 * @returns {Object} An async queue (F0A instance) that streams results as they are processed.
 */
function streamPromptCommands(
  messageStream,
  permissionContext,
  mcpClients,
  availableCommands,
  toolList,
  permissionPromptTool,
  initialMessages,
  options
) {
  // Queue of pending prompt commands
  let promptQueue = [];

  // Returns the current queue
  const getQueuedCommands = () => promptQueue;

  // Removes commands from the queue that are present in the given array
  const removeQueuedCommands = commandsToRemove => {
    promptQueue = promptQueue.filter(
      queuedCommand => !commandsToRemove.includes(queuedCommand)
    );
  };

  // Indicates if the queue is currently being processed
  let isProcessing = false;

  // Indicates if the input stream has ended
  let isInputComplete = false;

  // Async queue to stream results to consumers
  const resultQueue = new F0A();

  // Initial messages for the session (cloned for each run)
  const sessionInitialMessages = u_2(initialMessages);

  /**
   * Processes the prompt queue sequentially, streaming results as they arrive.
   * Only supports 'prompt' mode commands.
   */
  const processPromptQueue = async () => {
    isProcessing = true;
    try {
      while (promptQueue.length > 0) {
        const queuedCommand = promptQueue.shift();
        if (queuedCommand.mode !== "prompt") {
          throw new Error(
            "only prompt commands are supported in streaming mode"
          );
        }
        const promptValue = queuedCommand.value;
        // Stream results from runInteractiveSession and enqueue them for consumers
        for await (const streamedResult of runInteractiveSession({
          commands: availableCommands,
          prompt: promptValue,
          cwd: zU5(),
          tools: toolList,
          permissionContext: permissionContext,
          verbose: options.verbose,
          mcpClients: mcpClients,
          maxTurns: options.maxTurns,
          permissionPromptTool: permissionPromptTool,
          userSpecifiedModel: options.userSpecifiedModel,
          initialMessages: sessionInitialMessages,
          customSystemPrompt: options.systemPrompt,
          appendSystemPrompt: options.appendSystemPrompt,
          getQueuedCommands: getQueuedCommands,
          removeQueuedCommands: removeQueuedCommands
        })) {
          sessionInitialMessages.push(streamedResult);
          resultQueue.enqueue(streamedResult);
        }
      }
    } finally {
      isProcessing = false;
    }
    // If input is complete and nothing is processing, close the result queue
    if (isInputComplete) {
      resultQueue.done();
    }
  };

  // Start processing the message stream
  (async () => {
    for await (const messageEvent of messageStream) {
      let promptText;
      // Extract the prompt text from the message event
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
      // If not already processing, start processing the queue
      if (!isProcessing) {
        processPromptQueue();
      }
    }
    // Mark input as complete
    isInputComplete = true;
    // If not processing, close the result queue
    if (!isProcessing) {
      resultQueue.done();
    }
  })();

  // Return the async queue for consumers to read results
  return resultQueue;
}

module.exports = streamPromptCommands;