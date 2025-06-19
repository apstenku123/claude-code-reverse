/**
 * Determines if the provided event name matches any of the valid interaction event constants.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.eventName - The name of the event to validate.
 * @returns {boolean} True if the event name is a valid interaction event; otherwise, false.
 */
function isValidInteractionEvent({ eventName }) {
  // Check if the eventName matches any of the valid interaction event constants
  return eventName === VCA || eventName === CCA || eventName === KCA;
}

module.exports = isValidInteractionEvent;