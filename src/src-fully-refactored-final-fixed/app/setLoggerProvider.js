/**
 * Sets the logger provider for the N9 module.
 *
 * @param {object} loggerProvider - An object that provides logging functionality. This will be used by the N9 module for all logging operations.
 * @returns {void} This function does not return a value.
 */
function setLoggerProvider(loggerProvider) {
  // Assign the provided logger provider to the N9 module'createInteractionAccessor loggerProvider property
  N9.loggerProvider = loggerProvider;
}

module.exports = setLoggerProvider;