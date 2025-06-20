/**
 * Checks whether a given observable key exists as an object in either the cached configuration or the HL object.
 *
 * If the key is invalid according to the isArrayPropertyInConfigOrHL function, returns false.
 * If configFlag is true, checks the cached configuration object returned by getCachedConfig().
 * If configFlag is false, checks the HL object.
 *
 * @param {string} observableKey - The key of the observable to check.
 * @param {boolean} configFlag - Determines whether to check the cached config (true) or HL (false).
 * @returns {boolean} True if the observable key exists as an object in the selected source, false otherwise.
 */
function isObservableObjectInConfigOrHL(observableKey, configFlag) {
  // If the observable key is invalid, return false
  if (isArrayPropertyInConfigOrHL(observableKey, configFlag)) return false;

  if (configFlag) {
    // Retrieve the cached configuration object
    const cachedConfig = getCachedConfig();
    // Check if the key exists and is an object in the cached config
    return observableKey in cachedConfig && typeof cachedConfig[observableKey] === "object";
  } else {
    // Retrieve the value from the HL object
    const hlEntry = HL[observableKey];
    // Check if the key exists and is an object in HL
    return observableKey in HL && typeof hlEntry === "object";
  }
}

module.exports = isObservableObjectInConfigOrHL;