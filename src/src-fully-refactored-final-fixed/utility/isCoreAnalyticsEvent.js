/**
 * Checks if the provided event name matches any of the core analytics event constants (VCA, CCA, KCA).
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.eventName - The name of the event to check.
 * @returns {boolean} True if the event name is a core analytics event, false otherwise.
 */
const isCoreAnalyticsEvent = ({ eventName }) => {
  // Check if the event name matches any of the core analytics event constants
  return eventName === VCA || eventName === CCA || eventName === KCA;
};

module.exports = isCoreAnalyticsEvent;