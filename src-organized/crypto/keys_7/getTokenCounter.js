/**
 * Retrieves the current value of the token counter from the N9 module.
 *
 * @returns {number} The current token counter value.
 */
function getTokenCounter() {
  // Access and return the tokenCounter property from the N9 module
  return N9.tokenCounter;
}

module.exports = getTokenCounter;