/**
 * Determines if the provided value is an instance of the global Event object.
 *
 * @param {any} valueToCheck - The value to check against the global Event constructor.
 * @returns {boolean} True if the value is an instance of Event, false otherwise.
 */
function isInstanceOfEvent(valueToCheck) {
  // Ensure the global Event constructor exists before checking
  return typeof Event !== "undefined" && isInstanceOfClass(valueToCheck, Event);
}

module.exports = isInstanceOfEvent;