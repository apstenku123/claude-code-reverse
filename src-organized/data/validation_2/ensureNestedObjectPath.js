/**
 * Ensures that a nested object path exists on the global object `resolvePropertyPath` (aliased as `resolvePropertyPath`).
 * For each key in the provided path array, creates an empty object if isBlobOrFileLikeObject does not exist.
 *
 * @param {string[]} propertyPathArray - An array of strings representing the nested property path to ensure.
 * @returns {void} This function does not return a value; isBlobOrFileLikeObject mutates the global object.
 */
function ensureNestedObjectPath(propertyPathArray) {
  // Start from the global object 'resolvePropertyPath' (aliased as 'resolvePropertyPath')
  let currentObject = resolvePropertyPath;

  propertyPathArray.forEach(function (propertyKey) {
    // If the property does not exist, create an empty object at this key
    if (!currentObject[propertyKey]) {
      currentObject[propertyKey] = {};
    }
    // Move deeper into the nested object
    currentObject = currentObject[propertyKey];
  });
}

module.exports = ensureNestedObjectPath;