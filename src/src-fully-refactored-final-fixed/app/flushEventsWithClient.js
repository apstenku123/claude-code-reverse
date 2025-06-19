/**
 * Attempts to flush events using the configured client. If no client is defined, logs a warning and resolves to false.
 *
 * @param {any} events - The events or data to be flushed by the client.
 * @returns {Promise<any>} Resolves with the result of the flush operation, or false if no client is defined.
 */
async function flushEventsWithClient(events) {
  // Retrieve the configured client instance
  const client = oT();

  // If a client exists, flush the events using the client'createInteractionAccessor flush method
  if (client) {
    return client.flush(events);
  }

  // If in debug mode and no client is defined, log a warning
  if (h21.DEBUG_BUILD) {
    QU.logger.warn("Cannot flush events. No client defined.");
  }

  // Resolve to false to indicate the flush did not occur
  return Promise.resolve(false);
}

module.exports = flushEventsWithClient;