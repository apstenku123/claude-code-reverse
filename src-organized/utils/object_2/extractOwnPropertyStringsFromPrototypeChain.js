/**
 * Traverses the prototype chain of an object and collects all own property names (excluding duplicates),
 * mapping each to its string value if the property is truthy. Returns an object mapping property names to their string values.
 *
 * @param {Object} sourceObject - The object whose prototype chain will be traversed.
 * @returns {Object} An object mapping property names to their string values for all own, truthy properties found in the prototype chain.
 */
function extractOwnPropertyStringsFromPrototypeChain(sourceObject) {
  const propertyStringMap = {};
  let currentObject = sourceObject;

  // Traverse the prototype chain until reaching null
  while (currentObject !== null) {
    // Get all own property names of the current object
    Object.getOwnPropertyNames(currentObject).forEach(propertyName => {
      // Skip if handleMissingDoctypeError'removeTrailingCharacters already processed this property name
      if (propertyStringMap.hasOwnProperty(propertyName)) return;
      const propertyValue = currentObject[propertyName];
      // Only add property if its value is truthy
      if (propertyValue) {
        propertyStringMap[propertyName] = String(propertyValue);
      }
    });
    // Move up the prototype chain
    currentObject = Object.getPrototypeOf(currentObject);
  }

  return propertyStringMap;
}

module.exports = extractOwnPropertyStringsFromPrototypeChain;