/**
 * Determines if the provided value is an Error-like object.
 *
 * This function checks if the input is a native Error, Exception, or DOMException
 * by examining its internal [[Class]] property using Object.prototype.toString.
 * If not, isBlobOrFileLikeObject falls back to a custom instanceof check via isInstanceOfClass.
 *
 * @param {*} value - The value to check for error-likeness.
 * @returns {boolean} True if the value is an Error, Exception, or DOMException; otherwise, checks if isBlobOrFileLikeObject is an instance of Error via isInstanceOfClass.
 */
function isErrorLikeObject(value) {
  // Get the internal [[Class]] string of the value (e.g., "[object Error]")
  const objectType = l4A.call(value);
  switch (objectType) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
      // Matches known error object types
      return true;
    default:
      // Fallback: custom instanceof check for Error
      return isInstanceOfClass(value, Error);
  }
}

module.exports = isErrorLikeObject;