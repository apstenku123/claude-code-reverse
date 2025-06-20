/**
 * Validates if the provided value exists as a key in the allowed values object.
 * If not, logs a warning using the provided logger.
 *
 * @param {any} value - The value to validate.
 * @param {string} valueName - The name of the value (used in warning messages).
 * @param {object} loggerContext - The context or identifier used to retrieve logger methods.
 * @returns {any|undefined} - Returns the value if valid, otherwise undefined.
 */
function validateValueAgainstAllowedKeys(value, valueName, loggerContext) {
  // If value is falsy (null, undefined, false, 0, etc.), return early
  if (!value) return;

  // Check if value exists as a key in the allowed values object (uW1)
  if (Za0(uW1, value)) return value;

  // If value is not allowed, log a warning with details
  const logger = getOrCreateLoggerMethods(loggerContext);
  logger.warn(
    `${valueName} was set to ${JSON.stringify(value)}, expected one of ${JSON.stringify(Object.keys(uW1))}`
  );
  return;
}

module.exports = validateValueAgainstAllowedKeys;