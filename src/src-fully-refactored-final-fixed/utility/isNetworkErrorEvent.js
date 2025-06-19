/**
 * Determines if the provided event object represents a network error.
 *
 * a network error is defined as an event with a type of 'error' and a status of 0.
 *
 * @param {Object} event - The event object to evaluate.
 * @param {string} event.type - The type of the event (should be 'error' for a network error).
 * @param {number} event.status - The status code associated with the event (should be 0 for a network error).
 * @returns {boolean} True if the event is a network error, otherwise false.
 */
function isNetworkErrorEvent(event) {
  // Check if the event type is 'error' and the status is 0, indicating a network error
  return event.type === "error" && event.status === 0;
}

module.exports = isNetworkErrorEvent;
