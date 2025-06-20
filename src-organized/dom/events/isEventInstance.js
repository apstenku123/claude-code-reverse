/**
 * Determines if the provided value is an instance of the global Event constructor.
 *
 * @param {any} valueToCheck - The value to check against the global Event constructor.
 * @returns {boolean} True if Event is defined and valueToCheck is an Event instance; otherwise, false.
 */
function isEventInstance(valueToCheck) {
  // Check if the global Event constructor is available (e.g., in browsers)
  // and delegate the instance check to the isInstanceOfClass utility function
  return typeof Event !== "undefined" && isInstanceOfClass(valueToCheck, Event);
}

module.exports = isEventInstance;