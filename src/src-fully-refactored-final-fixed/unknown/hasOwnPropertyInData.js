/**
 * Checks if the provided key exists as an own property in the internal data object.
 * Uses a compatibility flag to determine the method of property existence check.
 *
 * @param {string} propertyKey - The key to check for existence in the data object.
 * @returns {boolean} True if the property exists and is not strictly equal to the sentinel value; otherwise, uses a fallback method.
 */
function hasOwnPropertyInData(propertyKey) {
  // Internal data storage object
  const dataStore = this.__data__;

  // If compatibility flag is set, check if property exists and is not the sentinel value
  if (CJ) {
    return dataStore[propertyKey] !== mapInteractionsToRoutes;
  }

  // Otherwise, use the fallback method to check property existence
  return createOrAppendStateNode.call(dataStore, propertyKey);
}

module.exports = hasOwnPropertyInData;