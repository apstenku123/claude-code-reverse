/**
 * Determines if the current time has exceeded a specified timeout duration since a given start time.
 *
 * @param {Object} params - The parameters object.
 * @param {number} params.startTime - The timestamp (in milliseconds) representing the start time.
 * @returns {boolean} True if the elapsed time since startTime is greater than the timeout threshold (OVA), otherwise false.
 */
function hasExceededTimeout({ startTime }) {
  // OVA is assumed to be a predefined timeout threshold in milliseconds
  // Returns true if the elapsed time since startTime exceeds OVA
  return Date.now() - startTime > OVA;
}

module.exports = hasExceededTimeout;