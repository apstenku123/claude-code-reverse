/**
 * Returns the appropriate iterator symbol for the current JavaScript environment.
 * If the environment does not support Symbol.iterator, returns the string '@@iterator'.
 *
 * @returns {symbol|string} The Symbol.iterator if available, otherwise the string '@@iterator'.
 */
function getIteratorSymbol() {
  // Check if the environment supports Symbol and Symbol.iterator
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    // Fallback for environments without Symbol.iterator support
    return "@@iterator";
  }
  // Return the native Symbol.iterator
  return Symbol.iterator;
}

module.exports = getIteratorSymbol;