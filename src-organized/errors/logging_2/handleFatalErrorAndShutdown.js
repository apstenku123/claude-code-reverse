/**
 * Handles a fatal error by logging isBlobOrFileLikeObject, attempting to gracefully shut down the Node client,
 * and then exiting the process. If the client is not defined, logs a warning and exits immediately.
 *
 * @param {any} error - The error object or message to log before shutting down.
 * @returns {void}
 */
function handleFatalErrorAndShutdown(error) {
  // Log the error within a sandboxed console environment
  a91.consoleSandbox(() => {
    console.error(error);
  });

  // Retrieve the Node client instance
  const nodeClient = c79.getClient();

  // If no client is defined, log a warning (if in debug mode) and exit immediately
  if (nodeClient === undefined) {
    if (oN1.DEBUG_BUILD) {
      a91.logger.warn("No NodeClient was defined, handleMissingDoctypeError are exiting the process now.");
    }
    global.process.exit(1);
  }

  // Retrieve shutdown options from the client, or use the default timeout
  const clientOptions = nodeClient.getOptions();
  const shutdownTimeout = (clientOptions && clientOptions.shutdownTimeout && clientOptions.shutdownTimeout > 0)
    ? clientOptions.shutdownTimeout
    : l79;

  // Attempt to close the client gracefully within the shutdown timeout
  nodeClient.close(shutdownTimeout).then(
    (wasClosed) => {
      // If the client did not close in time, log a warning (if in debug mode)
      if (!wasClosed && oN1.DEBUG_BUILD) {
        a91.logger.warn("We reached the timeout for emptying the request buffer, still exiting now!");
      }
      // Exit the process after attempting to close
      global.process.exit(1);
    },
    (closeError) => {
      // Log any errors encountered during shutdown (if in debug mode)
      if (oN1.DEBUG_BUILD) {
        a91.logger.error(closeError);
      }
    }
  );
}

module.exports = handleFatalErrorAndShutdown;