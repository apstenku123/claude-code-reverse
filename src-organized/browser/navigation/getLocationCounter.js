/**
 * Retrieves the current value of the location counter from the N9 module.
 *
 * @returns {number} The current value of the location counter.
 */
function getLocationCounter() {
  // Return the current value of the location counter from the N9 object
  return N9.locCounter;
}

module.exports = getLocationCounter;