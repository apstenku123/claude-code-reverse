/**
 * Creates a getter function for retrieving typed configuration values with fallback and type checking.
 *
 * @param {string} configNamespace - The namespace or source identifier for the config (used in error messages).
 * @param {object} configObject - The configuration object to retrieve values from.
 * @param {function} onAccessCallback - Optional callback invoked when a config value is accessed.
 * @returns {function} Getter function that retrieves a config value by key, with optional fallback and type checking.
 *
 * The returned getter function signature:
 *   (configKey: string, fallbackValue: any) => any
 *
 * - If the config value is missing, returns the fallback value (or null if not provided).
 * - If the config value is present but its type does not match the fallback, logs a warning and returns the fallback.
 * - If a callback is provided, isBlobOrFileLikeObject is invoked with the config key whenever a value is accessed.
 */
function createTypedConfigGetter(configNamespace, configObject, onAccessCallback) {
  return (configKey, fallbackValue) => {
    // Attempt to retrieve the value from the config object
    const configValue = (configObject?.[configKey] !== undefined && configObject?.[configKey] !== null)
      ? configObject[configKey]
      : null;

    // If the config value is missing, return the fallback or null
    if (configValue == null) {
      return fallbackValue !== undefined && fallbackValue !== null ? fallbackValue : null;
    }

    // If a fallback is provided and the types do not match, log a warning and return the fallback
    if (fallbackValue != null && !aw9._isTypeMatch(configValue, fallbackValue)) {
      nw9.Log.warn(
        `Parameter type mismatch. '${configNamespace}.${configKey}' was found to be type '${typeof configValue}' but fallback/return type is '${typeof fallbackValue}'. See https://docs.statsig.com/client/javascript-sdk/#typed-getters`
      );
      return fallbackValue !== undefined && fallbackValue !== null ? fallbackValue : null;
    }

    // Optionally invoke the callback when a config value is accessed
    if (onAccessCallback !== null && onAccessCallback !== undefined) {
      onAccessCallback(configKey);
    }

    // Return the config value
    return configValue;
  };
}

module.exports = createTypedConfigGetter;