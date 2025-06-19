/**
 * Sets the global event logger to the provided logger implementation.
 *
 * @function setEventLogger
 * @category app
 * @module /Users/davegornshtein/Documents/test22/1.0.19/src/app/setEventLogger.js
 *
 * @param {Function} eventLogger - The logger function or object to be used for event logging.
 * @returns {void} This function does not return a value.
 *
 * @example
 * setEventLogger(customLogger);
 */
function setEventLogger(eventLogger) {
  // Assign the provided logger to the global N9.eventLogger property
  N9.eventLogger = eventLogger;
}

module.exports = setEventLogger;