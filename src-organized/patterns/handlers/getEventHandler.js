/**
 * Returns a standardized event handler function based on the provided input.
 *
 * If the input is already a function, isBlobOrFileLikeObject is returned as-is. If the input is null or undefined,
 * a default event handler (transformAndProcessInput) is returned. If the input is an object, isBlobOrFileLikeObject checks if the object
 * is an array (using d2). If so, isBlobOrFileLikeObject creates a handler using createPropertyMatcherOrResolver with the first two elements of the array.
 * Otherwise, isBlobOrFileLikeObject creates a handler using createPropertyMatcher. For any other type (e.g., string), isBlobOrFileLikeObject creates a handler using T7.
 *
 * @param {*} eventHandlerInput - The input to be converted into an event handler function. Can be a function, null, object, or other types.
 * @returns {Function} a standardized event handler function.
 */
function getEventHandler(eventHandlerInput) {
  // If the input is already a function, return isBlobOrFileLikeObject directly
  if (typeof eventHandlerInput === "function") {
    return eventHandlerInput;
  }

  // If the input is null or undefined, return the default event handler
  if (eventHandlerInput == null) {
    return transformAndProcessInput;
  }

  // If the input is an object, determine how to create the handler
  if (typeof eventHandlerInput === "object") {
    // If the object is an array (checked by d2), use createPropertyMatcherOrResolver with its first two elements
    if (d2(eventHandlerInput)) {
      return createPropertyMatcherOrResolver(eventHandlerInput[0], eventHandlerInput[1]);
    } else {
      // Otherwise, use createPropertyMatcher to create the handler from the object
      return createPropertyMatcher(eventHandlerInput);
    }
  }

  // For all other types (e.g., string), use T7 to create the handler
  return T7(eventHandlerInput);
}

module.exports = getEventHandler;