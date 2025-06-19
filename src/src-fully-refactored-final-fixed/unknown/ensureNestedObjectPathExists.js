/**
 * Ensures that a nested object path exists on the global object `resolvePropertyPath` (aliased as `resolvePropertyPath`).
 * For each key in the provided path array, isBlobOrFileLikeObject creates an empty object if isBlobOrFileLikeObject does not exist.
 *
 * @param {string[]} propertyPathArray - An array of strings representing the nested property path.
 * @returns {void}
 */
function ensureNestedObjectPathExists(propertyPathArray) {
  // Alias for the global object that holds nested properties
  let currentObject = resolvePropertyPath;

  // Iterate over each key in the property path array
  propertyPathArray.forEach(function (propertyKey) {
    // If the property does not exist, create an empty object at that key
    if (!currentObject[propertyKey]) {
      currentObject[propertyKey] = {};
    }
    // Move deeper into the nested object
    currentObject = currentObject[propertyKey];
  });
}

module.exports = ensureNestedObjectPathExists;