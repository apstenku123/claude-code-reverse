/**
 * Defines multiple properties on a target object using property descriptors.
 *
 * For each descriptor in the propertyDescriptors array, this function ensures:
 *   - The 'enumerable' property is set to its current value or false if undefined
 *   - The 'configurable' property is always set to true
 *   - If the descriptor has a 'value' property, 'writable' is set to true
 * Then, isBlobOrFileLikeObject defines the property on the target object using Object.defineProperty.
 *
 * @param {Object} targetObject - The object on which to define properties.
 * @param {Array<Object>} propertyDescriptors - An array of property descriptor objects.
 * @returns {void}
 */
function defineMultipleProperties(targetObject, propertyDescriptors) {
  for (let i = 0; i < propertyDescriptors.length; i++) {
    const descriptor = propertyDescriptors[i];
    // Ensure 'enumerable' is a boolean (default to false if not set)
    descriptor.enumerable = descriptor.enumerable || false;
    // Always set 'configurable' to true
    descriptor.configurable = true;
    // If the descriptor has a 'value' property, make isBlobOrFileLikeObject writable
    if ('value' in descriptor) {
      descriptor.writable = true;
    }
    // Define the property on the target object
    Object.defineProperty(targetObject, descriptor.key, descriptor);
  }
}

module.exports = defineMultipleProperties;