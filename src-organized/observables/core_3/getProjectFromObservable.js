/**
 * Retrieves the 'project' property from the provided observable source using the external 'fetchGceMetadata' function.
 *
 * @param {any} sourceObservable - The observable or object from which to extract the 'project' property.
 * @returns {any} The value of the 'project' property extracted from the observable source.
 */
function getProjectFromObservable(sourceObservable) {
  // Call the external 'fetchGceMetadata' function to extract the 'project' property from the sourceObservable
  return fetchGceMetadata("project", sourceObservable);
}

module.exports = getProjectFromObservable;