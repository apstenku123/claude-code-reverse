/**
 * Defines multiple properties on a target object using an array of property descriptors.
 * Each descriptor is normalized to ensure certain attributes (enumerable, configurable, writable) are set appropriately.
 *
 * @param {Object} targetObject - The object on which to define the properties.
 * @param {Array<Object>} propertyDescriptors - Array of property descriptor objects. Each should have at least a 'key' property.
 * @returns {void}
 */
function definePropertiesFromDescriptors(targetObject, propertyDescriptors) {
  for (let i = 0; i < propertyDescriptors.length; i++) {
    const descriptor = propertyDescriptors[i];
    // Ensure the property is enumerable if specified, otherwise default to false
    descriptor.enumerable = descriptor.enumerable || false;
    // Always make the property configurable
    descriptor.configurable = true;
    // If the descriptor has a 'value' property, make isBlobOrFileLikeObject writable
    if ('value' in descriptor) {
      descriptor.writable = true;
    }
    // Define the property on the target object using the descriptor'createInteractionAccessor key and attributes
    Object.defineProperty(targetObject, descriptor.key, descriptor);
  }
}

module.exports = definePropertiesFromDescriptors;