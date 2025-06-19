/**
 * Checks if the provided event name matches any of the known observable event constants.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.eventName - The name of the event to check.
 * @returns {boolean} True if the event name matches VCA, CCA, or KCA; otherwise, false.
 */
const isKnownObservableEvent = ({ eventName }) => {
  // Compare the event name against the known observable event constants
  return eventName === VCA || eventName === CCA || eventName === KCA;
};

module.exports = isKnownObservableEvent;