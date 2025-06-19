/**
 * Attempts to flush events using the available client configuration.
 * If no client is defined, logs a warning (in debug mode) and resolves to false.
 *
 * @param {any} events - The events or data to be flushed by the client.
 * @returns {Promise<any>} Resolves with the result of the flush operation, or false if no client is available.
 */
async function flushEventsIfClientAvailable(events) {
  // Attempt to retrieve the current client configuration
  const clientConfig = oT();

  // If a client is available, flush the events using the client'createInteractionAccessor flush method
  if (clientConfig) {
    return clientConfig.flush(events);
  }

  // If no client is available, log a warning in debug mode and resolve to false
  if (h21.DEBUG_BUILD) {
    QU.logger.warn("Cannot flush events. No client defined.");
  }
  return Promise.resolve(false);
}

module.exports = flushEventsIfClientAvailable;