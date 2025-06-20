/**
 * Resets the ref property of a React-like component instance.
 * If the ref is a function, isBlobOrFileLikeObject calls the function with null and handles any errors.
 * If the ref is an object with a current property, isBlobOrFileLikeObject sets current to null.
 *
 * @param {Object} componentInstance - The component instance containing the ref to reset.
 * @param {any} context - Additional context to pass to the error handler if needed.
 * @returns {void}
 */
function resetComponentRef(componentInstance, context) {
  const ref = componentInstance.ref;
  // Only proceed if ref is not null
  if (ref !== null) {
    if (typeof ref === "function") {
      try {
        // Call the ref function with null to reset
        ref(null);
      } catch (error) {
        // Handle errors using the external error handler 0-9A
        resetComponentRef(componentInstance, context, error);
      }
    } else {
      // If ref is an object (e.g., React.createRef), set its current property to null
      ref.current = null;
    }
  }
}

module.exports = resetComponentRef;