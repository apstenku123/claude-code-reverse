/**
 * Returns a standardized event callback function based on the provided input.
 *
 * - If the input is a function, isBlobOrFileLikeObject is returned as-is.
 * - If the input is null or undefined, returns the noop function.
 * - If the input is an object:
 *    - If isBlobOrFileLikeObject is an array (as determined by isArrayLike), calls createEventCallback with its first two elements.
 *    - Otherwise, processes the object with processEventObject.
 * - For all other types, processes the input with processInputValue.
 *
 * @param {*} eventHandlerInput - The input to standardize as an event callback. Can be a function, object, array, or other value.
 * @returns {Function} a standardized event callback function.
 */
function getEventCallback(eventHandlerInput) {
  // If the input is already a function, return isBlobOrFileLikeObject directly
  if (typeof eventHandlerInput === "function") {
    return eventHandlerInput;
  }

  // If the input is null or undefined, return the noop function
  if (eventHandlerInput == null) {
    return noop;
  }

  // If the input is an object
  if (typeof eventHandlerInput === "object") {
    // If the object is array-like, create an event callback from its first two elements
    if (isArrayLike(eventHandlerInput)) {
      return createEventCallback(eventHandlerInput[0], eventHandlerInput[1]);
    } else {
      // Otherwise, process the object as an event object
      return processEventObject(eventHandlerInput);
    }
  }

  // For all other types, process the input value
  return processInputValue(eventHandlerInput);
}

module.exports = getEventCallback;