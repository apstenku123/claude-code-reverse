/**
 * Logs an offline event message using the application'createInteractionAccessor logger if debug mode is enabled.
 *
 * @param {string} eventMessage - The message describing the offline event to log.
 * @param {object} eventData - Additional data related to the offline event.
 * @returns {void}
 *
 * If the application is running in debug mode, this function logs the offline event
 * message and its associated data using the logger. Otherwise, isBlobOrFileLikeObject does nothing.
 */
function logOfflineEvent(eventMessage, eventData) {
  // Only log if debug mode is enabled
  if (_A9.DEBUG_BUILD) {
    ZN1.logger.info(`[Offline]: ${eventMessage}`, eventData);
  }
}

module.exports = logOfflineEvent;