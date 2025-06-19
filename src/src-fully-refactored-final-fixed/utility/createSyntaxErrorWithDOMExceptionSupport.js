/**
 * Creates a SyntaxError, using DOMException if available for better browser compatibility.
 *
 * @param {string} message - The error message to use for the SyntaxError.
 * @returns {SyntaxError|DOMException} a SyntaxError or DOMException instance with the provided message.
 */
function createSyntaxErrorWithDOMExceptionSupport(message) {
  // Check if DOMException is available in the global scope
  const DOMExceptionConstructor = globalThis.DOMException;

  // If DOMException is a function (constructor), use isBlobOrFileLikeObject to create a SyntaxError-type DOMException
  if (typeof DOMExceptionConstructor === "function") {
    return new DOMExceptionConstructor(message, "SyntaxError");
  }

  // Fallback: use the built-in SyntaxError constructor
  return new SyntaxError(message);
}

module.exports = createSyntaxErrorWithDOMExceptionSupport;