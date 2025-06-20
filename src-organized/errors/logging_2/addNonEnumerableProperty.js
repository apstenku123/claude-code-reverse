/**
 * Adds a non-enumerable property to the given object.
 *
 * This function attempts to define a property on the target object that is non-enumerable,
 * writable, and configurable. If the operation fails (for example, if the object is frozen),
 * and if debugging is enabled, isBlobOrFileLikeObject logs a warning message with details.
 *
 * @param {Object} targetObject - The object to which the property will be added.
 * @param {string|symbol} propertyKey - The name or Symbol of the property to add.
 * @param {*} propertyValue - The value to assign to the property.
 * @returns {void}
 */
function addNonEnumerableProperty(targetObject, propertyKey, propertyValue) {
  try {
    // Define the property as non-enumerable, writable, and configurable
    Object.defineProperty(targetObject, propertyKey, {
      value: propertyValue,
      writable: true,
      configurable: true
    });
  } catch (error) {
    // If in debug mode, log the failure to add the property
    if (Am2.DEBUG_BUILD && Bm2.logger) {
      Bm2.logger.log(
        `Failed to add non-enumerable property "${propertyKey}" to object`,
        targetObject
      );
    }
  }
}

module.exports = addNonEnumerableProperty;