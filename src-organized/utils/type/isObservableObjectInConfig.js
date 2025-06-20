/**
 * Checks if a given observable key exists as an object in either the cached configuration or a global object.
 *
 * @param {string} observableKey - The key representing the observable to check for.
 * @param {boolean} useCachedConfig - If true, checks in the cached configuration; otherwise, checks in the global object.
 * @returns {boolean} True if the observable key exists and is an object in the specified source; false otherwise.
 */
function isObservableObjectInConfig(observableKey, useCachedConfig) {
  // If the observableKey is blacklisted or invalid, return false immediately
  if (isArrayPropertyInConfigOrHL(observableKey, useCachedConfig)) return false;

  if (useCachedConfig) {
    // Retrieve the cached or fresh configuration object
    const configObject = getCachedOrFreshConfig();
    // Check if the key exists in the config and is an object
    return (
      observableKey in configObject &&
      typeof configObject[observableKey] === "object"
    );
  } else {
    // Retrieve the value from the global HL object
    const globalObservable = HL[observableKey];
    // Check if the key exists in HL and is an object
    return (
      observableKey in HL &&
      typeof globalObservable === "object"
    );
  }
}

module.exports = isObservableObjectInConfig;