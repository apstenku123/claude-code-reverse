/**
 * Determines if the provided last update timestamp is considered stale based on a predefined threshold (RVA).
 *
 * @param {Object} params - The parameters object.
 * @param {number} params.lastUpdate - The timestamp (in milliseconds) of the last update.
 * @returns {boolean} True if the last update is older than the RVA threshold, false otherwise.
 */
function isLastUpdateStale({ lastUpdate }) {
  // RVA is an external constant representing the staleness threshold in milliseconds
  // Date.now() returns the current timestamp in milliseconds
  return Date.now() - lastUpdate > RVA;
}

module.exports = isLastUpdateStale;