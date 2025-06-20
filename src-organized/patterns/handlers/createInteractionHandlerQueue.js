/**
 * Factory function to create a handler queue for processing user interactions.
 * Ensures that only one handler is active at a time and provides methods to add new handlers and process the next handler in the queue.
 *
 * @param {Function} processInteraction - Callback to process an interaction (e.g., mapInteractionsToRouteNames).
 * @returns {{ add: Function, next: Function }} Object with methods to add a handler and process the next handler.
 */
function createInteractionHandlerQueue(processInteraction) {
  /**
   * Queue of handler functions to process interactions.
   * @type {Function[]}
   */
  let handlerQueue = [];

  /**
   * Flag indicating whether a handler is currently active.
   * @type {boolean}
   */
  let isHandlerActive = false;

  /**
   * Default handler to start processing an interaction.
   * Clears the queue and ensures only one handler is active at a time.
   *
   * @param {*} interactionData - Data related to the user interaction.
   */
  function startHandler(interactionData) {
    handlerQueue = []; // Clear the queue
    if (isHandlerActive) return; // Prevent concurrent handlers
    isHandlerActive = true;
    processInteraction(interactionData);
  }

  // Add the default handler to the queue initially
  handlerQueue.push(startHandler);

  /**
   * Adds a new handler function to the queue.
   *
   * @param {Function} handler - Handler function to add to the queue.
   */
  function addHandler(handler) {
    handlerQueue.push(handler);
  }

  /**
   * Processes the next handler in the queue with the provided interaction data.
   * If the handler throws an error, falls back to the default handler.
   *
   * @param {*} interactionData - Data to be passed to the handler.
   */
  function processNextHandler(interactionData) {
    // Remove the last handler from the queue, or use the default if empty
    const nextHandler = handlerQueue.pop() || startHandler;
    try {
      nextHandler(interactionData);
    } catch (error) {
      // On error, fallback to the default handler
      startHandler(interactionData);
    }
  }

  return {
    add: addHandler,
    next: processNextHandler
  };
}

module.exports = createInteractionHandlerQueue;