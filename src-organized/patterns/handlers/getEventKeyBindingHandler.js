/**
 * Returns a standardized event key binding handler function based on the input.
 *
 * If the input is already a function, isBlobOrFileLikeObject is returned as-is.
 * If the input is null or undefined, a default handler (transformAndProcessInput) is returned.
 * If the input is an object:
 *   - If isBlobOrFileLikeObject is an array (checked by d2), isBlobOrFileLikeObject creates a handler using createPropertyMatcherOrResolver with the first two elements.
 *   - Otherwise, isBlobOrFileLikeObject creates a handler using createPropertyMatcher.
 * For any other input, isBlobOrFileLikeObject creates a handler using T7.
 *
 * @param {*} eventKeyBinding - The event key binding specification. Can be a function, null, array, or object.
 * @returns {Function} a standardized event key binding handler function.
 */
function getEventKeyBindingHandler(eventKeyBinding) {
  // If the input is already a function, return isBlobOrFileLikeObject directly
  if (typeof eventKeyBinding === "function") {
    return eventKeyBinding;
  }

  // If the input is null or undefined, return the default handler
  if (eventKeyBinding == null) {
    return transformAndProcessInput;
  }

  // If the input is an object
  if (typeof eventKeyBinding === "object") {
    // If the object is an array, use createPropertyMatcherOrResolver with its first two elements
    if (d2(eventKeyBinding)) {
      return createPropertyMatcherOrResolver(eventKeyBinding[0], eventKeyBinding[1]);
    } else {
      // Otherwise, use createPropertyMatcher to create a handler from the object
      return createPropertyMatcher(eventKeyBinding);
    }
  }

  // For any other input, use T7 to create a handler
  return T7(eventKeyBinding);
}

module.exports = getEventKeyBindingHandler;