/**
 * Factory function to create an interaction handler with a queue of callbacks.
 *
 * @param {Function} processInteractionEntries - Function to process interaction entries (e.g., mapping to route names, storing metadata).
 * @returns {Object} An object with `add` and `next` methods to manage the interaction queue.
 */
function createInteractionHandler(processInteractionEntries) {
  /**
   * Queue of interaction callbacks to be executed.
   * @type {Function[]}
   */
  let interactionQueue = [];

  /**
   * Flag to ensure only one interaction is processed at a time.
   * @type {boolean}
   */
  let isProcessing = false;

  /**
   * Default interaction handler. Clears the queue and processes the interaction if not already processing.
   * @param {*} interactionData - The data to process for the interaction.
   */
  function defaultInteractionHandler(interactionData) {
    interactionQueue = []; // Clear the queue
    if (isProcessing) return; // Prevent re-entrancy
    isProcessing = true;
    processInteractionEntries(interactionData);
  }

  // Add the default handler to the queue initially
  interactionQueue.push(defaultInteractionHandler);

  /**
   * Adds a new interaction handler to the queue.
   * @param {Function} handler - The handler function to add.
   */
  function addInteractionHandler(handler) {
    interactionQueue.push(handler);
  }

  /**
   * Executes the most recently added interaction handler with the provided data.
   * If an error occurs, falls back to the default handler.
   * @param {*} interactionData - The data to pass to the handler.
   */
  function executeNextInteraction(interactionData) {
    // Remove the last handler from the queue, or use the default if queue is empty
    const handler = interactionQueue.pop() || defaultInteractionHandler;
    try {
      handler(interactionData);
    } catch (error) {
      // On error, fallback to the default handler
      defaultInteractionHandler(interactionData);
    }
  }

  return {
    add: addInteractionHandler,
    next: executeNextInteraction
  };
}

module.exports = createInteractionHandler;