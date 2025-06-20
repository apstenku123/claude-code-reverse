/**
 * Logs an observable event with contextual information if logging is enabled in the config.
 *
 * @param {object} sourceObservable - The observable or source object related to the event.
 * @param {object} config - Configuration object that determines if logging should occur.
 * @param {object} subscription - The subscription or event payload to log.
 * @returns {void}
 */
function logObservableEventIfEnabled(sourceObservable, config, subscription) {
  // Check if logging is enabled via the config using DT0
  if (DT0(config)) {
    // Compose the log message with timestamp, version, process id, config, and subscription info
    const timestamp = new Date().toISOString();
    const version = s26; // Application version (assumed global)
    const processId = a26.pid; // Process updateSnapshotAndNotify(assumed global)
    const logMessage = `${timestamp} | defineOrAssignProperty{version} ${processId} | ${config} | ${subscription}`;

    // Log the event using the application'createInteractionAccessor logger
    YT0.log(sourceObservable, logMessage);
  }
}

module.exports = logObservableEventIfEnabled;