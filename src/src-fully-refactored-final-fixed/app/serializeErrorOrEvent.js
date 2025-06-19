/**
 * Serializes an error or event object into a plain object with relevant properties.
 *
 * If the input is an Error, returns an object containing its message, name, stack, and any additional properties from shallowCopyOwnProperties.
 * If the input is an Event, returns an object with its type, target, currentTarget, and any additional properties from shallowCopyOwnProperties. If the event is a CustomEvent, includes the detail property as well.
 * Otherwise, returns the input as-is.
 *
 * @param {any} input - The value to serialize (could be an Error, Event, or any other type).
 * @returns {any} a plain object representing the error or event, or the original input if not an error/event.
 */
function serializeErrorOrEvent(input) {
  // Check if input is an Error object
  if (fy.isError(input)) {
    return {
      message: input.message,
      name: input.name,
      stack: input.stack,
      ...shallowCopyOwnProperties(input) // Merge in additional properties from shallowCopyOwnProperties
    };
  } else if (fy.isEvent(input)) {
    // Serialize Event object
    const serializedEvent = {
      type: input.type,
      target: C6A(input.target),
      currentTarget: C6A(input.currentTarget),
      ...shallowCopyOwnProperties(input) // Merge in additional properties from shallowCopyOwnProperties
    };
    // If CustomEvent is supported and input is a CustomEvent, add the detail property
    if (typeof CustomEvent !== "undefined" && fy.isInstanceOf(input, CustomEvent)) {
      serializedEvent.detail = input.detail;
    }
    return serializedEvent;
  } else {
    // Return input as-is if not an Error or Event
    return input;
  }
}

module.exports = serializeErrorOrEvent;
