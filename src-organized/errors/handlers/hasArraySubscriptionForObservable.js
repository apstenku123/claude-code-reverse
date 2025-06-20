/**
 * Checks if a given observable has an array of subscriptions, either in a global registry or a local cache.
 *
 * @param {string} observableName - The name/key of the observable to check.
 * @param {boolean} useGlobalRegistry - If true, checks the global registry (via getCachedOrFreshConfig()); otherwise, checks the local HL object.
 * @returns {boolean} True if the observable exists and its subscriptions are stored as an array; false otherwise.
 */
function hasArraySubscriptionForObservable(observableName, useGlobalRegistry) {
  if (useGlobalRegistry) {
    // Retrieve the global registry of observables
    const globalRegistry = getCachedOrFreshConfig();
    // Check if the observable exists and its value is an array
    return (
      observableName in globalRegistry &&
      Array.isArray(globalRegistry[observableName])
    );
  } else {
    // Retrieve the local cache of observables
    const localSubscriptions = HL[observableName];
    // Check if the observable exists in HL and its value is an array
    return (
      observableName in HL &&
      Array.isArray(localSubscriptions)
    );
  }
}

module.exports = hasArraySubscriptionForObservable;