/**
 * Determines if the last update timestamp is considered stale based on a predefined threshold.
 *
 * @param {Object} params - The parameters object.
 * @param {number} params.lastUpdate - The timestamp (in milliseconds) of the last update.
 * @returns {boolean} True if the time since last update exceeds the RVA threshold, otherwise false.
 */
function isUpdateStale({ lastUpdate }) {
  // RVA is an external constant representing the staleness threshold in milliseconds
  // Date.now() returns the current timestamp in milliseconds
  return Date.now() - lastUpdate > RVA;
}

module.exports = isUpdateStale;