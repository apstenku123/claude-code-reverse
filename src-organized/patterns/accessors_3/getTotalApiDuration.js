/**
 * Retrieves the total duration of all API calls recorded in the N9 object.
 *
 * @returns {number} The total API duration in milliseconds.
 */
function getTotalApiDuration() {
  // Access the totalAPIDuration property from the N9 object
  return N9.totalAPIDuration;
}

module.exports = getTotalApiDuration;