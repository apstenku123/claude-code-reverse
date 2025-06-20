/**
 * Logs a debug-level message for a server call using the application'createInteractionAccessor logging utility.
 *
 * @param {any} serverCallData - The data related to the server call to be logged.
 * @returns {void} This function does not return a value.
 */
function logServerCallDebug(serverCallData) {
  // Log the server call data at DEBUG verbosity level
  ag.trace(LQ.LogVerbosity.DEBUG, "server_call", serverCallData);
}

module.exports = logServerCallDebug;