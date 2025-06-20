/**
 * Checks if the provided event object contains an exception of type 'SentryError'.
 *
 * @param {Object} event - The event object to inspect. Expected to have the structure: { exception: { values: [{ type: string }] } }
 * @returns {boolean} Returns true if the first exception'createInteractionAccessor type is 'SentryError', otherwise false.
 */
function isSentryErrorException(event) {
  try {
    // Check if the event has an exception with a values array and if the first value'createInteractionAccessor type is 'SentryError'
    return event.exception.values[0].type === "SentryError";
  } catch (error) {
    // If any property is missing or an error occurs, return false
  }
  return false;
}

module.exports = isSentryErrorException;