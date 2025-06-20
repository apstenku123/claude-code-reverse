/**
 * Processes a list of property keys, retrieves their values from the source object, 
 * applies a predicate function, and conditionally adds them to a result object after mapping the key.
 *
 * @param {Object} sourceObject - The object from which property values are retrieved.
 * @param {Array} propertyKeys - An array of property keys to process.
 * @param {Function} predicate - a function that receives (propertyValue, propertyKey) and returns a boolean.
 * @returns {Object} a new object containing mapped keys and their corresponding values that passed the predicate.
 */
function processAndMapProperties(sourceObject, propertyKeys, predicate) {
  let index = 0;
  const totalKeys = propertyKeys.length;
  const resultObject = {};

  // Iterate over each property key
  while (index < totalKeys) {
    const currentKey = propertyKeys[index];
    // Retrieve the value from the source object using getNestedPropertyByPath
    const propertyValue = getNestedPropertyByPath(sourceObject, currentKey);

    // If the predicate returns true, map and assign the property
    if (predicate(propertyValue, currentKey)) {
      // Map the key using processPendingFiberNodes and assign the value using setNestedPropertyWithCustomizer
      setNestedPropertyWithCustomizer(resultObject, processPendingFiberNodes(currentKey, sourceObject), propertyValue);
    }
    index++;
  }

  return resultObject;
}

module.exports = processAndMapProperties;