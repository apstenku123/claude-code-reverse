/**
 * Merges properties from the provided properties object into a specific key of the target object.
 * If the properties object is non-empty, isBlobOrFileLikeObject shallow-copies the target object'createInteractionAccessor key value (to avoid mutation),
 * then copies all own properties from the properties object into that key.
 *
 * @param {Object} targetObject - The object whose key will be updated with new properties.
 * @param {string} targetKey - The key in the target object to update.
 * @param {Object} propertiesToMerge - The properties to merge into the target object'createInteractionAccessor key.
 * @returns {void}
 */
function mergePropertiesIntoObjectKey(targetObject, targetKey, propertiesToMerge) {
  // Only proceed if propertiesToMerge is provided and has at least one property
  if (propertiesToMerge && Object.keys(propertiesToMerge).length > 0) {
    // Shallow copy the existing object at targetKey to avoid mutating the original
    targetObject[targetKey] = {
      ...targetObject[targetKey]
    };
    // Copy each own property from propertiesToMerge into the target object'createInteractionAccessor key
    for (const propertyName in propertiesToMerge) {
      if (Object.prototype.hasOwnProperty.call(propertiesToMerge, propertyName)) {
        targetObject[targetKey][propertyName] = propertiesToMerge[propertyName];
      }
    }
  }
}

module.exports = mergePropertiesIntoObjectKey;