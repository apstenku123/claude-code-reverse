/**
 * Retrieves a property from the global object using the key stored in the global variable 'globalPropertyKey'.
 *
 * @returns {any} The value of the global property referenced by 'globalPropertyKey'.
 */
function getGlobalPropertyByKey() {
  // 'globalPropertyKey' is expected to be defined in the global scope
  // and should contain the property name to retrieve from globalThis.
  return globalThis[globalPropertyKey];
}

module.exports = getGlobalPropertyByKey;