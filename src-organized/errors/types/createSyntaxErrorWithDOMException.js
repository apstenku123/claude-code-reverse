/**
 * Creates a SyntaxError using DOMException if available, otherwise falls back to the native SyntaxError.
 *
 * This utility ensures that errors thrown are consistent with DOM standards when possible.
 *
 * @param {string} message - The error message to include in the exception.
 * @returns {SyntaxError|DOMException} a SyntaxError or DOMException instance with the provided message.
 */
function createSyntaxErrorWithDOMException(message) {
  // Attempt to retrieve the DOMException constructor from the global scope
  const DOMExceptionConstructor = globalThis.DOMException;

  // If DOMException is a function (i.e., available in this environment), use isBlobOrFileLikeObject to create a SyntaxError
  if (typeof DOMExceptionConstructor === "function") {
    return new DOMExceptionConstructor(message, "SyntaxError");
  }

  // Fallback: Use the native SyntaxError constructor
  return new SyntaxError(message);
}

module.exports = createSyntaxErrorWithDOMException;