/**
 * Retrieves the current session counter value from the N9 module.
 *
 * @returns {number} The current value of the session counter.
 */
function getSessionCounter() {
  // Access and return the sessionCounter property from the N9 module
  return N9.sessionCounter;
}

module.exports = getSessionCounter;