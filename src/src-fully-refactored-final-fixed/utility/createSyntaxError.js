/**
 * Creates a SyntaxError exception, using DOMException if available for better compatibility with web APIs.
 *
 * @param {string} message - The error message to include in the exception.
 * @returns {SyntaxError|DOMException} a SyntaxError or DOMException instance with the provided message.
 */
function createSyntaxError(message) {
  // Attempt to use the global DOMException constructor if available (browser environments)
  const DOMExceptionConstructor = globalThis.DOMException;
  if (typeof DOMExceptionConstructor === "function") {
    // DOMException allows specifying the error type ("SyntaxError")
    return new DOMExceptionConstructor(message, "SyntaxError");
  }
  // Fallback to the built-in SyntaxError constructor (Node.js or older browsers)
  return new SyntaxError(message);
}

module.exports = createSyntaxError;