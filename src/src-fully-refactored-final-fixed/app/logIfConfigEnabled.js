/**
 * Logs a message with contextual information if the provided config is enabled.
 *
 * @param {Object} sourceObservable - The observable or source object related to the log event.
 * @param {Object} config - Configuration object; logging occurs only if DT0(config) returns true.
 * @param {any} subscription - The subscription or additional context to include in the log message.
 * @returns {void}
 */
function logIfConfigEnabled(sourceObservable, config, subscription) {
  // Check if logging is enabled for the given config
  if (DT0(config)) {
    // Compose the log message with timestamp, version, process updateSnapshotAndNotify, config, and subscription info
    const logMessage = `${new Date().toISOString()} | defineOrAssignProperty{s26} ${a26.pid} | ${config} | ${subscription}`;
    YT0.log(sourceObservable, logMessage);
  }
}

module.exports = logIfConfigEnabled;