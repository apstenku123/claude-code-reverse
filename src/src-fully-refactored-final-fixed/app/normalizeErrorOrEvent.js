/**
 * Normalizes an input value by extracting relevant properties if isBlobOrFileLikeObject is an Error or Event.
 *
 * - If the input is an Error, returns an object with its message, name, stack, and additional properties from shallowCopyOwnProperties.
 * - If the input is an Event, returns an object with its type, normalized target and currentTarget, and additional properties from shallowCopyOwnProperties.
 *   If the Event is a CustomEvent, includes the 'detail' property.
 * - Otherwise, returns the input as-is.
 *
 * @param {any} input - The value to normalize (could be an Error, Event, or any other type).
 * @returns {any} Normalized object if input is Error or Event, otherwise the input itself.
 */
function normalizeErrorOrEvent(input) {
  // Check if the input is an Error object
  if (fy.isError(input)) {
    return {
      message: input.message,
      name: input.name,
      stack: input.stack,
      // Spread any additional properties from shallowCopyOwnProperties
      ...shallowCopyOwnProperties(input)
    };
  }
  // Check if the input is an Event object
  else if (fy.isEvent(input)) {
    const normalizedEvent = {
      type: input.type,
      target: C6A(input.target),
      currentTarget: C6A(input.currentTarget),
      // Spread any additional properties from shallowCopyOwnProperties
      ...shallowCopyOwnProperties(input)
    };
    // If CustomEvent is defined and input is an instance of CustomEvent, add 'detail'
    if (typeof CustomEvent !== "undefined" && fy.isInstanceOf(input, CustomEvent)) {
      normalizedEvent.detail = input.detail;
    }
    return normalizedEvent;
  }
  // For all other types, return the input as-is
  else {
    return input;
  }
}

module.exports = normalizeErrorOrEvent;