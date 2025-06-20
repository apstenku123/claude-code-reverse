/**
 * Determines if the provided configuration object matches the given observable source.
 * Uses two external comparison functions: areMessagesAndMetadataEquivalent and areObjectsEquivalent.
 *
 * @param {any} sourceObservable - The observable or source object to compare against.
 * @param {any} config - The configuration object to check for a match.
 * @returns {boolean} Returns true if the configuration matches the observable source using either areMessagesAndMetadataEquivalent or areObjectsEquivalent, otherwise false.
 */
function isObservableConfigMatch(sourceObservable, config) {
  // If config is falsy (null, undefined, false, etc.), immediately return false
  if (!config) {
    return false;
  }

  // Check for a match using the areMessagesAndMetadataEquivalent comparison function
  if (areMessagesAndMetadataEquivalent(sourceObservable, config)) {
    return true;
  }

  // Check for a match using the areObjectsEquivalent comparison function
  if (areObjectsEquivalent(sourceObservable, config)) {
    return true;
  }

  // If neither comparison matched, return false
  return false;
}

module.exports = isObservableConfigMatch;