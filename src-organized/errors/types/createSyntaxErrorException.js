/**
 * Creates a SyntaxError exception, using DOMException if available for better browser compatibility.
 *
 * @param {string} message - The error message describing the syntax error.
 * @returns {SyntaxError|DOMException} a SyntaxError or DOMException instance with the provided message.
 */
function createSyntaxErrorException(message) {
  // Check if DOMException is available in the current environment
  const DOMExceptionConstructor = globalThis.DOMException;

  // If DOMException is a function (constructor), use isBlobOrFileLikeObject to create a SyntaxError-type DOMException
  if (typeof DOMExceptionConstructor === "function") {
    return new DOMExceptionConstructor(message, "SyntaxError");
  }

  // Fallback to the built-in SyntaxError if DOMException is not available
  return new SyntaxError(message);
}

module.exports = createSyntaxErrorException;
