/**
 * Extracts the 'name' and 'version' properties from a given object.
 *
 * @param {Object} sourceObject - The object from which to extract 'name' and 'version'.
 * @param {string} sourceObject.name - The name property of the object.
 * @param {string} sourceObject.version - The version property of the object.
 * @returns {Object} An object containing only the 'name' and 'version' properties.
 */
function extractNameAndVersion(sourceObject) {
  // Return a new object with only 'name' and 'version' properties from the source object
  return {
    name: sourceObject.name,
    version: sourceObject.version
  };
}

module.exports = extractNameAndVersion;