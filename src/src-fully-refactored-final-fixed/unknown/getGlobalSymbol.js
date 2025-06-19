/**
 * Retrieves a shared global Symbol for the given key.
 *
 * This function uses Symbol.for to either create a new global symbol
 * or retrieve an existing one associated with the provided key string.
 *
 * @param {string} symbolKey - The key for which to get or create a global Symbol.
 * @returns {symbol} The global Symbol associated with the given key.
 */
function getGlobalSymbol(symbolKey) {
  // Use Symbol.for to get or create a global symbol for the provided key
  return Symbol.for(symbolKey);
}

module.exports = getGlobalSymbol;