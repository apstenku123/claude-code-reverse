/**
 * Registers an event processor with the current client if available.
 *
 * This utility function retrieves the current client instance from P19.
 * If the client exists and supports event processors, isBlobOrFileLikeObject adds the provided event processor.
 *
 * @param {Function} eventProcessor - The event processor function to be registered.
 * @returns {void}
 */
function registerEventProcessor(eventProcessor) {
  // Retrieve the current client instance from P19
  const client = P19.getClient();

  // If client does not exist or does not support addEventProcessor, exit early
  if (!client || typeof client.addEventProcessor !== 'function') {
    return;
  }

  // Register the provided event processor with the client
  client.addEventProcessor(eventProcessor);
}

module.exports = registerEventProcessor;