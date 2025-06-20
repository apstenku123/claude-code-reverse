/**
 * Extracts key event properties from an event-like object.
 *
 * @param {Object} eventObject - The event-like object containing event properties.
 * @param {string} eventObject.type - The type of the event.
 * @param {string} [eventObject.message] - The message associated with the event.
 * @param {string|number} [eventObject.code] - The code associated with the event.
 * @param {boolean} [eventObject.defaultPrevented] - Indicates if the event'createInteractionAccessor default action has been prevented.
 * @param {boolean} [eventObject.cancelable] - Indicates if the event is cancelable.
 * @param {number} [eventObject.timeStamp] - The timestamp when the event was created.
 * @returns {Object} An object containing the extracted event properties.
 */
function extractEventProperties(eventObject) {
  // Return a new object with only the relevant event properties
  return {
    type: eventObject.type,
    message: eventObject.message,
    code: eventObject.code,
    defaultPrevented: eventObject.defaultPrevented,
    cancelable: eventObject.cancelable,
    timeStamp: eventObject.timeStamp
  };
}

module.exports = extractEventProperties;