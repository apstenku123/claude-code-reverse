/**
 * Checks if a given observable key corresponds to a valid subscription object.
 *
 * If a configuration flag is provided, isBlobOrFileLikeObject checks within the result of getCachedOrFreshConfig() (likely a global subscriptions registry).
 * Otherwise, isBlobOrFileLikeObject checks within the HL object (likely a local or cached registry).
 *
 * The function first checks with the isArrayPropertyInConfigOrHL() utility if the observable and config combination is invalid.
 *
 * @param {string} observableKey - The key identifying the observable to check.
 * @param {boolean} useGlobalRegistry - If true, checks the global registry (getCachedOrFreshConfig()), otherwise checks HL.
 * @returns {boolean} True if the observable key exists and is an object in the selected registry, false otherwise.
 */
function isObservableSubscriptionObject(observableKey, useGlobalRegistry) {
  // If the combination is invalid according to isArrayPropertyInConfigOrHL(), return false
  if (isArrayPropertyInConfigOrHL(observableKey, useGlobalRegistry)) return false;

  if (useGlobalRegistry) {
    // Get the global subscriptions registry
    const globalSubscriptions = getCachedOrFreshConfig();
    // Check if the observableKey exists and is an object
    return (
      observableKey in globalSubscriptions &&
      typeof globalSubscriptions[observableKey] === "object"
    );
  } else {
    // Check in the local HL registry
    const localSubscription = HL[observableKey];
    return (
      observableKey in HL &&
      typeof localSubscription === "object"
    );
  }
}

module.exports = isObservableSubscriptionObject;