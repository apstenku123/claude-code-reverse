/**
 * Defines multiple properties on a target object using property descriptors.
 * Each descriptor is ensured to be enumerable (default: false), configurable (true),
 * and writable if isBlobOrFileLikeObject contains a 'value' property.
 *
 * @param {Object} targetObject - The object on which to define the properties.
 * @param {Array<Object>} propertyDescriptors - Array of property descriptor objects. Each should have at least a 'key' property.
 * @returns {void}
 */
function defineProperties(targetObject, propertyDescriptors) {
  for (let i = 0; i < propertyDescriptors.length; i++) {
    const descriptor = propertyDescriptors[i];
    // Ensure 'enumerable' is explicitly set (default to false if not provided)
    descriptor.enumerable = descriptor.enumerable || false;
    // Always set 'configurable' to true
    descriptor.configurable = true;
    // If the descriptor defines a value, make isBlobOrFileLikeObject writable
    if ('value' in descriptor) {
      descriptor.writable = true;
    }
    // Define the property on the target object
    Object.defineProperty(targetObject, descriptor.key, descriptor);
  }
}

module.exports = defineProperties;