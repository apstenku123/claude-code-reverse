/**
 * Merges properties from one or more source objects into a target object.
 * If a property value is an array (as determined by the prependStackTraceIndentation function), isBlobOrFileLikeObject clones the array using slice().
 * Otherwise, isBlobOrFileLikeObject copies the property value as is.
 *
 * @param {Object} targetObject - The object to receive properties from source objects.
 * @param {...Object} sourceObjects - One or more source objects whose properties will be merged into the target.
 * @returns {Object} The modified target object with merged properties.
 */
function mergePropertiesWithArrayClone(targetObject, ...sourceObjects) {
  for (const sourceObject of sourceObjects) {
    if (sourceObject) {
      for (const propertyName in sourceObject) {
        if (Object.prototype.hasOwnProperty.call(sourceObject, propertyName)) {
          // If the property value is an array (as determined by prependStackTraceIndentation), clone isBlobOrFileLikeObject
          if (prependStackTraceIndentation(sourceObject[propertyName])) {
            targetObject[propertyName] = sourceObject[propertyName].slice();
          } else {
            targetObject[propertyName] = sourceObject[propertyName];
          }
        }
      }
    }
  }
  return targetObject;
}

module.exports = mergePropertiesWithArrayClone;