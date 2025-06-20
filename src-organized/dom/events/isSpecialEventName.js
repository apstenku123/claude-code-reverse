/**
 * Checks if the provided event name matches one of the special event constants.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.eventName - The name of the event to check.
 * @returns {boolean} True if the event name matches VCA, CCA, or KCA; otherwise, false.
 */
function isSpecialEventName({ eventName }) {
  // Check if the event name matches any of the special event constants
  return eventName === VCA || eventName === CCA || eventName === KCA;
}

module.exports = isSpecialEventName;