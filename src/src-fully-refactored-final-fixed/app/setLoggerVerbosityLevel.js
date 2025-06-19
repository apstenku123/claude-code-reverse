/**
 * Sets the logger verbosity level for the application.
 *
 * @param {string} verbosityLevel - The desired verbosity level for the logger (e.g., 'info', 'debug', 'error').
 * @returns {void} This function does not return a value.
 */
const setLoggerVerbosityLevel = (verbosityLevel) => {
  // Set the logger'createInteractionAccessor verbosity level using the external Qx0 logger utility
  Qx0.setLoggerVerbosity(verbosityLevel);
};

module.exports = setLoggerVerbosityLevel;
