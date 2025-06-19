/**
 * Defines or updates properties on an object using a callback to determine property descriptors.
 *
 * Iterates over all own property descriptors of the target object, applies a callback to each,
 * and updates the object'createInteractionAccessor properties with the returned descriptors (unless the callback returns false).
 *
 * @param {Object} targetObject - The object whose properties will be updated.
 * @param {Function} propertyCallback - a function called for each property descriptor. Receives (descriptor, propertyName, targetObject).
 *        Should return a property descriptor object, or false to skip updating that property.
 * @returns {void}
 */
function definePropertiesWithCallback(targetObject, propertyCallback) {
  // Get all own property descriptors of the target object
  const propertyDescriptors = Object.getOwnPropertyDescriptors(targetObject);
  // Prepare an object to collect new/updated property descriptors
  const updatedDescriptors = {};

  // Iterate over each property descriptor using the 'iterateCollection' utility function
  iterateCollection(propertyDescriptors, (descriptor, propertyName) => {
    // Call the callback to get a possibly updated descriptor
    const resultDescriptor = propertyCallback(descriptor, propertyName, targetObject);
    // If the callback returns false, skip updating this property
    if (resultDescriptor !== false) {
      // Use the returned descriptor, or the original if the callback returns a falsy value (except false)
      updatedDescriptors[propertyName] = resultDescriptor || descriptor;
    }
  });

  // Define the new/updated property descriptors on the target object
  Object.defineProperties(targetObject, updatedDescriptors);
}

module.exports = definePropertiesWithCallback;