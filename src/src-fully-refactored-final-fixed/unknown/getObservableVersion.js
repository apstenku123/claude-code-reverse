/**
 * Retrieves the version from an observable source string using a provided configuration.
 *
 * This function trims whitespace from the input observable string, removes any leading '=' or 'createRangeIterator' characters,
 * and then attempts to extract version information using the LM6 helper function. If a version is found,
 * isBlobOrFileLikeObject is returned; otherwise, null is returned.
 *
 * @param {string} sourceObservable - The observable source string to extract the version from.
 * @param {object} config - Configuration object to be passed to the LM6 helper function.
 * @returns {string|null} The extracted version string if found, otherwise null.
 */
function getObservableVersion(sourceObservable, config) {
  // Remove leading/trailing whitespace and any leading '=' or 'createRangeIterator' characters
  const cleanedObservable = sourceObservable.trim().replace(/^[=createRangeIterator]+/, "");

  // Attempt to extract version information using the LM6 helper function
  const subscription = LM6(cleanedObservable, config);

  // Return the version if found, otherwise null
  return subscription ? subscription.version : null;
}

module.exports = getObservableVersion;
