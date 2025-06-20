/**
 * Determines if two observables are equivalent by comparing their unique identifiers.
 * Returns false if the config object is falsy.
 *
 * @param {object} sourceObservable - The first observable to compare.
 * @param {object} config - The configuration object containing the second observable.
 * @returns {boolean} True if both observables have the same identifier, false otherwise.
 */
function areObservablesEquivalent(sourceObservable, config) {
  // If config is falsy (null, undefined, false, etc.), return false immediately
  if (!config) {
    return false;
  }
  // Compare the unique identifiers of both observables using removeTrailingSlash
  return removeTrailingSlash(sourceObservable) === removeTrailingSlash(config);
}

module.exports = areObservablesEquivalent;