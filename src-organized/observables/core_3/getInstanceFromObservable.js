/**
 * Retrieves the 'instance' property or value from the provided observable source.
 *
 * @param {any} sourceObservable - The observable or object from which to extract the 'instance'.
 * @returns {any} The extracted 'instance' from the observable source.
 */
function getInstanceFromObservable(sourceObservable) {
  // Delegates to the external 'fetchGceMetadata' function to extract the 'instance' from the observable
  return fetchGceMetadata("instance", sourceObservable);
}

module.exports = getInstanceFromObservable;