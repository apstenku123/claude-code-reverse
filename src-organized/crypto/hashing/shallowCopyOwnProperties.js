/**
 * Creates a shallow copy of an object'createInteractionAccessor own enumerable properties.
 * If the input is not a non-null object, returns an empty object.
 *
 * @param {object} sourceObject - The object whose own properties will be copied.
 * @returns {object} a new object containing only the own enumerable properties of the source object.
 */
function shallowCopyOwnProperties(sourceObject) {
  // Check if the input is a non-null object
  if (typeof sourceObject === "object" && sourceObject !== null) {
    const copiedObject = {};
    // Iterate over all properties in the source object
    for (const propertyName in sourceObject) {
      // Only copy properties that are direct (own) properties
      if (Object.prototype.hasOwnProperty.call(sourceObject, propertyName)) {
        copiedObject[propertyName] = sourceObject[propertyName];
      }
    }
    return copiedObject;
  } else {
    // Return an empty object if input is not a non-null object
    return {};
  }
}

module.exports = shallowCopyOwnProperties;
