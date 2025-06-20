/**
 * Retrieves the current set of counters from the bD module.
 *
 * This accessor function provides a way to obtain the latest counters
 * maintained by the bD object. It does not accept any parameters and
 * simply returns the result of bD.counters().
 *
 * @returns {Object} An object containing the current counters.
 */
function getCounters() {
  // Call the counters method from the bD module and return its result
  return bD.counters();
}

module.exports = getCounters;