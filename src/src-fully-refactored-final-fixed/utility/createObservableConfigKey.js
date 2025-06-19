/**
 * Generates a unique key for an observable and its configuration.
 *
 * This utility function combines the name or identifier of a source observable
 * with a stringified version of its configuration object, separated by a hyphen.
 * Useful for caching, memoization, or tracking unique observable/config pairs.
 *
 * @param {string} sourceObservable - The name or identifier of the source observable.
 * @param {Object} config - The configuration object associated with the observable.
 * @returns {string} a unique key representing the observable and its configuration.
 */
function createObservableConfigKey(sourceObservable, config) {
  // Combine the observable identifier and the stringified config for uniqueness
  return `${sourceObservable}-${JSON.stringify(config)}`;
}

module.exports = createObservableConfigKey;