/**
 * Checks if a given property key exists in the result of a transformation function applied to an object.
 *
 * @param {Object|null|undefined} targetObject - The object to check for the property. Can be null or undefined.
 * @param {string|symbol|number} propertyKey - The property key to check for in the transformed object.
 * @returns {boolean} True if the property exists in the transformed object, false otherwise.
 */
function hasPropertyInObjectLike(targetObject, propertyKey) {
  // mergePropertiesWithDescriptors is assumed to be a transformation function that returns an object-like structure
  // Only check if targetObject is not null or undefined
  return targetObject != null && propertyKey in mergePropertiesWithDescriptors(targetObject);
}

module.exports = hasPropertyInObjectLike;