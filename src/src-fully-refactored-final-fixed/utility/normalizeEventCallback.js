/**
 * Normalizes various types of event callback inputs into a standard callback function.
 *
 * This utility accepts a function, null/undefined, or an object (possibly an array or config object),
 * and returns a callback function suitable for event handling. If the input is already a function,
 * isBlobOrFileLikeObject is returned as-is. If the input is null or undefined, a no-operation function is returned.
 * If the input is an object, isBlobOrFileLikeObject is processed further depending on its structure.
 * Otherwise, the input is processed as an observable or other supported type.
 *
 * @param {*} eventCallbackInput - The input to normalize (function, null, object, or other).
 * @returns {Function} a normalized callback function for event handling.
 */
function normalizeEventCallback(eventCallbackInput) {
  // If the input is already a function, return isBlobOrFileLikeObject directly
  if (typeof eventCallbackInput === "function") {
    return eventCallbackInput;
  }

  // If the input is null or undefined, return the no-operation function
  if (eventCallbackInput == null) {
    return noop;
  }

  // If the input is an object, process accordingly
  if (typeof eventCallbackInput === "object") {
    // If the object is an array-like structure (e.g., [source, config]), process with createPropertyMatcherOrResolver
    if (isArrayLike(eventCallbackInput)) {
      // createPropertyMatcherOrResolver(sourceObservable, config)
      return processArrayCallback(eventCallbackInput[0], eventCallbackInput[1]);
    } else {
      // Otherwise, process with createPropertyMatcher(likely a config object)
      return processConfigObject(eventCallbackInput);
    }
  }

  // For all other types (e.g., string, number), process as an observable input
  return processObservableInput(eventCallbackInput);
}

// Dependencies (assumed to be imported or defined elsewhere in the module)
const noop = require('./noop'); // No-operation function
const processObservableInput = require('./processObservableInput'); // Handles observable or non-observable input
const processConfigObject = require('./createPropertyMatcher'); // Not yet refactored
const isArrayLike = require('./d2'); // Checks if input is array-like
const processArrayCallback = require('./createPropertyMatcherOrResolver'); // Processes [source, config] arrays

module.exports = normalizeEventCallback;
