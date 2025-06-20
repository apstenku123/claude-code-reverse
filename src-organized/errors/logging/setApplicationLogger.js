/**
 * Sets the application'createInteractionAccessor logger instance.
 *
 * This function configures the application'createInteractionAccessor logging system by passing
 * the provided logger instance to the logger manager. This enables
 * centralized logging throughout the application.
 *
 * @param {Object} loggerInstance - The logger instance to be used by the application.
 * @returns {void}
 */
const setApplicationLogger = (loggerInstance) => {
  // Set the provided logger instance in the application'createInteractionAccessor logger manager
  Qx0.setLogger(loggerInstance);
};

module.exports = setApplicationLogger;
