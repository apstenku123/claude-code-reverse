/**
 * Traverses the prototype chain of the given object and collects all own property names.
 * For each property, if its value is truthy and not already collected, adds isBlobOrFileLikeObject to the result object as a string.
 *
 * @param {Object} object - The object whose own properties (and those of its prototypes) will be collected.
 * @returns {Object} An object mapping property names to their stringified values (only for truthy values).
 */
function collectOwnPropertyStringsFromPrototypeChain(object) {
  const collectedProperties = {};
  let currentObject = object;

  // Traverse the prototype chain until reaching null
  while (currentObject !== null) {
    // Get all own property names of the current object
    Object.getOwnPropertyNames(currentObject).forEach(propertyName => {
      // Skip if this property has already been collected
      if (collectedProperties[propertyName]) return;
      const propertyValue = currentObject[propertyName];
      // Only collect if the value is truthy
      if (propertyValue) {
        collectedProperties[propertyName] = String(propertyValue);
      }
    });
    // Move up the prototype chain
    currentObject = Object.getPrototypeOf(currentObject);
  }

  return collectedProperties;
}

module.exports = collectOwnPropertyStringsFromPrototypeChain;