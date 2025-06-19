/**
 * Checks if a given key exists in the normalized version of an object.
 *
 * @param {Object|null|undefined} targetObject - The object to check for the key. Can be null or undefined.
 * @param {string|symbol|number} keyToCheck - The key to check for existence in the object.
 * @returns {boolean} True if the key exists in the normalized object, false otherwise.
 */
function doesObjectContainKey(targetObject, keyToCheck) {
  // Ensure the object is not null or undefined before checking for the key
  return targetObject != null && keyToCheck in mergePropertiesWithDescriptors(targetObject);
}

module.exports = doesObjectContainKey;