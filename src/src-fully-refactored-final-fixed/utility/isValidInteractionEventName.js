/**
 * Checks if the provided event name matches any of the valid interaction event constants.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.eventName - The name of the event to check.
 * @returns {boolean} True if the event name is a valid interaction event, false otherwise.
 */
const isValidInteractionEventName = ({ eventName }) => {
  // Check if the event name matches any of the allowed interaction event constants
  return eventName === VCA || eventName === CCA || eventName === KCA;
};

module.exports = isValidInteractionEventName;