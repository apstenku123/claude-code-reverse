/**
 * Retrieves a global property using a dynamic key stored in the global scope.
 *
 * @returns {any} The value of the global property referenced by the dynamic key.
 */
function getGlobalPropertyByDynamicKey() {
  // Hd1 is expected to be a string key defined in the global scope
  // globalThis[Hd1] accesses the global property with the name stored in Hd1
  return globalThis[Hd1];
}

module.exports = getGlobalPropertyByDynamicKey;