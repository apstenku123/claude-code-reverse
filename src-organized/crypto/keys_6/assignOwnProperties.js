/**
 * Copies all own enumerable properties from the source object to the target object.
 * Throws a TypeError if the target is not a non-null object.
 *
 * @param {Object} targetObject - The object to which properties will be assigned.
 * @param {Object} sourceObject - The object from which properties will be copied.
 * @returns {Object} The target object after properties have been assigned.
 */
function assignOwnProperties(targetObject, sourceObject) {
  // Ensure the target is a non-null object
  if (targetObject === null || typeof targetObject !== "object") {
    throw new TypeError("target is not an object");
  }

  // Iterate over all properties in the source object
  for (const propertyKey in sourceObject) {
    // Only copy own properties, not inherited ones
    if (Object.prototype.hasOwnProperty.call(sourceObject, propertyKey)) {
      targetObject[propertyKey] = sourceObject[propertyKey];
    }
  }

  return targetObject;
}

module.exports = assignOwnProperties;