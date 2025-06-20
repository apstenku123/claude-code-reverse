/**
 * Extracts all properties from the input object whose values are numbers.
 *
 * @param {Object} sourceObject - The object to extract number properties from.
 * @returns {Object} a new object containing only the properties from the input object whose values are numbers.
 */
function extractNumberProperties(sourceObject) {
  const numberProperties = {};
  
  // Iterate over all keys in the source object
  Object.keys(sourceObject).forEach(propertyName => {
    const propertyValue = sourceObject[propertyName];
    // Only include properties whose values are numbers
    if (typeof propertyValue === "number") {
      numberProperties[propertyName] = propertyValue;
    }
  });

  return numberProperties;
}

module.exports = extractNumberProperties;