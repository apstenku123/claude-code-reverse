/**
 * Extracts detailed information from an Error or Event object for logging or serialization.
 *
 * If the input is an Error, returns an object with its message, name, stack, and any additional properties from shallowCopyOwnProperties.
 * If the input is an Event, returns an object with its type, target, currentTarget, and any additional properties from shallowCopyOwnProperties.
 * If the Event is a CustomEvent, includes the detail property.
 * Otherwise, returns the input as-is.
 *
 * @param {Object} sourceObject - The object to extract details from (can be Error, Event, or any other type).
 * @returns {Object|any} An object with extracted details if input is Error or Event, otherwise the original input.
 */
function extractErrorOrEventDetails(sourceObject) {
  // Handle Error objects
  if (fy.isError(sourceObject)) {
    return {
      message: sourceObject.message,
      name: sourceObject.name,
      stack: sourceObject.stack,
      // Spread any additional properties from shallowCopyOwnProperties
      ...shallowCopyOwnProperties(sourceObject)
    };
  }
  // Handle Event objects
  else if (fy.isEvent(sourceObject)) {
    const eventDetails = {
      type: sourceObject.type,
      target: C6A(sourceObject.target),
      currentTarget: C6A(sourceObject.currentTarget),
      // Spread any additional properties from shallowCopyOwnProperties
      ...shallowCopyOwnProperties(sourceObject)
    };
    // If the event is a CustomEvent, include the 'detail' property
    if (typeof CustomEvent !== "undefined" && fy.isInstanceOf(sourceObject, CustomEvent)) {
      eventDetails.detail = sourceObject.detail;
    }
    return eventDetails;
  }
  // For all other types, return as-is
  else {
    return sourceObject;
  }
}

module.exports = extractErrorOrEventDetails;
