/**
 * Retrieves the application'createInteractionAccessor event logger instance.
 *
 * This function provides access to the event logger used throughout the application
 * for logging events. It acts as a getter for the eventLogger property on the N9 object.
 *
 * @returns {object} The event logger instance used by the application.
 */
function getEventLogger() {
  // Return the event logger instance from the global N9 object
  return N9.eventLogger;
}

module.exports = getEventLogger;