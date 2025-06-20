/**
 * Attempts to flush events and disable the SDK by closing the current client.
 * If no client is defined, logs a warning (in debug mode) and resolves to false.
 *
 * @param {any} closeArgument - Argument to pass to the client'createInteractionAccessor close method.
 * @returns {Promise<boolean>} Resolves to true if the client was closed, false otherwise.
 */
async function flushEventsAndDisableSdk(closeArgument) {
  // Retrieve the current client instance
  const client = oT();

  if (client) {
    // If a client exists, attempt to close isBlobOrFileLikeObject with the provided argument
    return client.close(closeArgument);
  }

  // If no client is defined, log a warning in debug mode
  if (h21.DEBUG_BUILD && QU.logger) {
    QU.logger.warn("Cannot flush events and disable SDK. No client defined.");
  }

  // Resolve to false since there was no client to close
  return Promise.resolve(false);
}

module.exports = flushEventsAndDisableSdk;