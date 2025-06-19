/**
 * Processes a list of property keys from a source object, applies a transformation and a filter,
 * and accumulates the results into a new object.
 *
 * @param {Object} sourceObject - The object whose properties are being processed.
 * @param {Array<string>} propertyKeys - An array of property keys to process from the source object.
 * @param {Function} filterCallback - a function that receives (propertyValue, propertyKey) and returns true if the property should be included.
 * @returns {Object} An object containing the filtered and processed properties.
 */
function processAndFilterProperties(sourceObject, propertyKeys, filterCallback) {
  let propertyIndex = 0;
  const totalProperties = propertyKeys.length;
  const resultObject = {};

  // Iterate over each property key in the provided array
  while (propertyIndex < totalProperties) {
    const currentKey = propertyKeys[propertyIndex];
    // Retrieve the value from the source object for the current key
    const propertyValue = getNestedPropertyByPath(sourceObject, currentKey);
    // Apply the filter callback to determine if this property should be included
    if (filterCallback(propertyValue, currentKey)) {
      // Add the property to the result object using a transformation on the key
      setNestedPropertyWithCustomizer(resultObject, processPendingFiberNodes(currentKey, sourceObject), propertyValue);
    }
    propertyIndex++;
  }

  return resultObject;
}

module.exports = processAndFilterProperties;