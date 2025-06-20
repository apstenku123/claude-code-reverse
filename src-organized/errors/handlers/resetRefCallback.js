/**
 * Resets the ref property of a given object. If the ref is a function, isBlobOrFileLikeObject calls the function with null and handles any errors using the provided error handler. If the ref is an object, isBlobOrFileLikeObject sets its current property to null.
 *
 * @param {Object} element - The object containing the ref property (typically a React element or similar structure).
 * @param {any} errorHandlerContext - Context or information to pass to the error handler in case of an exception.
 * @returns {void}
 */
function resetRefCallback(element, errorHandlerContext) {
  const ref = element.ref;
  // Only proceed if ref is not null
  if (ref !== null) {
    if (typeof ref === "function") {
      // If ref is a function, call isBlobOrFileLikeObject with null and handle errors
      try {
        ref(null);
      } catch (error) {
        // 0-9A is assumed to be an error handler function
        resetRefCallback(element, errorHandlerContext, error);
      }
    } else {
      // If ref is an object, set its current property to null
      ref.current = null;
    }
  }
}

module.exports = resetRefCallback;