/**
 * Collects properties from a list of items into a result object using a provided handler.
 *
 * Iterates over each item in the provided items array. For each non-falsy item, isBlobOrFileLikeObject calls the
 * propertyHandler function with the sourceObject, the current item, and the resultObject.
 * The handler is expected to mutate the resultObject as needed. Returns the resultObject
 * after processing all items.
 *
 * @param {Object} sourceObject - The source object to be used by the property handler.
 * @param {Array} items - An array of items to process.
 * @returns {Object} The result object containing collected properties.
 */
function collectPropertiesFromList(sourceObject, items) {
  const resultObject = {};
  // Iterate over each item in the items array
  items.forEach(item => {
    // Only process truthy items
    if (item) {
      // propertyHandler is assumed to mutate resultObject based on sourceObject and item
      installIntegration(sourceObject, item, resultObject);
    }
  });
  return resultObject;
}

module.exports = collectPropertiesFromList;