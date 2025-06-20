/**
 * Logs subscription events if logging is enabled in the configuration.
 *
 * @param {Observable} sourceObservable - The observable source related to the subscription event.
 * @param {object} config - The configuration object that determines if logging is enabled.
 * @param {any} subscription - The subscription or event data to be logged.
 * @returns {void}
 */
function logSubscriptionEventIfEnabled(sourceObservable, config, subscription) {
  // Check if logging is enabled using the DT0 function
  if (DT0(config)) {
    // Construct the log message with timestamp, version, process id, config, and subscription info
    const logMessage = `${new Date().toISOString()} | defineOrAssignProperty{s26} ${a26.pid} | ${config} | ${subscription}`;
    // Log the event using the application'createInteractionAccessor logger
    YT0.log(sourceObservable, logMessage);
  }
}

module.exports = logSubscriptionEventIfEnabled;