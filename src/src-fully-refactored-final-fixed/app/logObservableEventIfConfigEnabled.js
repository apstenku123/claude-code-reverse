/**
 * Logs an observable event with contextual information if the provided config is enabled.
 *
 * @param {Object} sourceObservable - The observable source related to the event.
 * @param {Object} config - Configuration object; logging occurs only if DT0(config) returns true.
 * @param {Object} subscription - The subscription or event details to be logged.
 * @returns {void}
 */
function logObservableEventIfConfigEnabled(sourceObservable, config, subscription) {
  // Check if logging is enabled for the given config
  if (DT0(config)) {
    // Construct log message with timestamp, version, process id, config, and subscription details
    const logMessage = `${new Date().toISOString()} | defineOrAssignProperty{s26} ${a26.pid} | ${config} | ${subscription}`;
    YT0.log(sourceObservable, logMessage);
  }
}

module.exports = logObservableEventIfConfigEnabled;