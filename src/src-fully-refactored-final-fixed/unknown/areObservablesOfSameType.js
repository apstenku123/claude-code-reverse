/**
 * Determines whether two observables are of the same type.
 *
 * @param {object} sourceObservable - The first observable to compare.
 * @param {object} config - The second observable or configuration object to compare.
 * @returns {boolean} True if both observables are of the same type; false otherwise.
 */
function areObservablesOfSameType(sourceObservable, config) {
  // If the config object is falsy (null, undefined, false, etc.), return false immediately
  if (!config) {
    return false;
  }
  // Compare the types of the two observables using the external removeTrailingSlash function
  return removeTrailingSlash(sourceObservable) === removeTrailingSlash(config);
}

module.exports = areObservablesOfSameType;