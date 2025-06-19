/**
 * Filters the properties of an object, returning a new object containing only the properties whose values are numbers.
 *
 * @param {Object} inputObject - The object to filter.
 * @returns {Object} a new object containing only the properties from inputObject whose values are numbers.
 */
function filterObjectPropertiesByNumberValue(inputObject) {
  const numberProperties = {};

  // Iterate over each property key in the input object
  Object.keys(inputObject).forEach(propertyKey => {
    const propertyValue = inputObject[propertyKey];
    // Only include properties whose value is a number
    if (typeof propertyValue === "number") {
      numberProperties[propertyKey] = propertyValue;
    }
  });

  return numberProperties;
}

module.exports = filterObjectPropertiesByNumberValue;