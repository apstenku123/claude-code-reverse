/**
 * Validates if the provided key exists in the allowedKeys object. If not, logs a warning.
 *
 * @param {string} key - The value to validate against allowedKeys.
 * @param {string} configName - The name of the configuration being set (used in warning messages).
 * @param {object} loggerInstance - The logger instance used to log warnings.
 * @returns {string|undefined} Returns the key if valid, otherwise undefined.
 */
function validateAndWarnOnInvalidKey(key, configName, loggerInstance) {
  // If no key is provided, exit early
  if (!key) return;

  // Check if the key exists in the allowedKeys object
  if (Za0(uW1, key)) return key;

  // If the key is invalid, log a warning with details
  getOrCreateLoggerMethods(loggerInstance).warn(
    `${configName} was set to ${JSON.stringify(key)}, expected one of ${JSON.stringify(Object.keys(uW1))}`
  );
  return;
}

module.exports = validateAndWarnOnInvalidKey;