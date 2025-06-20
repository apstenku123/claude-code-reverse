/**
 * Retrieves the current value of the process counter from the N9 module.
 *
 * @returns {number} The current value of the process counter.
 */
function getProcessCounter() {
  // Access and return the process counter from the N9 module
  return N9.prCounter;
}

module.exports = getProcessCounter;