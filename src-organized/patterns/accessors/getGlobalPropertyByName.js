/**
 * Retrieves a property from the global object using the property name stored in the global variable 'globalPropertyName'.
 *
 * @returns {any} The value of the global property whose name is stored in 'globalPropertyName'.
 */
function getGlobalPropertyByName() {
  // Access the global property using the name stored in 'globalPropertyName'
  return globalThis[globalPropertyName];
}

module.exports = getGlobalPropertyByName;