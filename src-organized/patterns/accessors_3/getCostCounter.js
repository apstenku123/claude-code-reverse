/**
 * Retrieves the current value of the cost counter from the N9 module.
 *
 * @returns {number} The current value of the cost counter.
 */
function getCostCounter() {
  // Access and return the costCounter property from the N9 module
  return N9.costCounter;
}

module.exports = getCostCounter;