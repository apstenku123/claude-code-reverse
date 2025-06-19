/**
 * Updates the properties of a target object by applying a callback to each property descriptor.
 * The callback can modify, replace, or skip each property. If the callback returns false, the property is skipped.
 * If the callback returns a value (other than false), that value is used as the new property descriptor; otherwise, the original descriptor is used.
 *
 * @param {Object} targetObject - The object whose properties will be updated.
 * @param {Function} propertyCallback - a function called for each property descriptor. Receives (descriptor, propertyName, targetObject).
 *        Should return a new property descriptor, or false to skip updating that property.
 * @returns {void}
 */
function updateObjectPropertiesWithCallback(targetObject, propertyCallback) {
  // Get all property descriptors of the target object
  const propertyDescriptors = Object.getOwnPropertyDescriptors(targetObject);
  // Prepare an object to hold new/updated property descriptors
  const updatedDescriptors = {};

  // Iterate over each property descriptor using the provided 'iterateCollection' function
  iterateCollection(propertyDescriptors, (descriptor, propertyName) => {
    // Call the callback to determine how to handle this property
    const callbackResult = propertyCallback(descriptor, propertyName, targetObject);
    // If the callback returns false, skip updating this property
    if (callbackResult !== false) {
      // Use the callback'createInteractionAccessor return value if provided, otherwise use the original descriptor
      updatedDescriptors[propertyName] = callbackResult || descriptor;
    }
  });

  // Define the updated properties on the target object
  Object.defineProperties(targetObject, updatedDescriptors);
}

module.exports = updateObjectPropertiesWithCallback;