/**
 * Retrieves the 'project' property from the provided source object using the external 'fetchGceMetadata' function.
 *
 * @param {any} sourceObject - The object or value from which to extract the 'project' property.
 * @returns {any} The value of the 'project' property, as returned by the 'fetchGceMetadata' function.
 */
function getProjectProperty(sourceObject) {
  // Delegates to the external 'fetchGceMetadata' function to extract the 'project' property
  return fetchGceMetadata("project", sourceObject);
}

module.exports = getProjectProperty;