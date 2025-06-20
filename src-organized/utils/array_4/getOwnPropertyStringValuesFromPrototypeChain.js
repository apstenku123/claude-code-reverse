/**
 * Traverses the prototype chain of the given object and collects all own property names,
 * mapping each to its string value (if the value is truthy and not already collected).
 *
 * @param {Object} sourceObject - The object whose prototype chain will be traversed.
 * @returns {Object} An object mapping property names to their string values.
 */
function getOwnPropertyStringValuesFromPrototypeChain(sourceObject) {
  const propertyStringValues = {};
  let currentObject = sourceObject;

  // Traverse the prototype chain until reaching null
  while (currentObject !== null) {
    // Get all own property names of the current object
    Object.getOwnPropertyNames(currentObject).forEach(propertyName => {
      // Skip if handleMissingDoctypeError'removeTrailingCharacters already collected this property
      if (propertyStringValues[propertyName]) return;
      const propertyValue = currentObject[propertyName];
      // Only add property if its value is truthy
      if (propertyValue) {
        propertyStringValues[propertyName] = String(propertyValue);
      }
    });
    // Move up the prototype chain
    currentObject = Object.getPrototypeOf(currentObject);
  }

  return propertyStringValues;
}

module.exports = getOwnPropertyStringValuesFromPrototypeChain;