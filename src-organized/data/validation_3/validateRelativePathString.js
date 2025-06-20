/**
 * Validates that the provided path is a non-empty, relative string.
 * Calls the provided error handler if validation fails.
 *
 * @param {string} path - The path string to validate.
 * @param {string} originalInput - The original input value for error reporting.
 * @param {function} errorHandler - Function to call with an error message and error type if validation fails.
 * @returns {boolean} Returns true if the path is valid; otherwise, the error handler is called and its return value is returned.
 */
function validateRelativePathString(path, originalInput, errorHandler) {
  // Check if the path is a string using isString utility
  if (!isString(path)) {
    return errorHandler(`path must be a string, but got \`${originalInput}\``, TypeError);
  }

  // Check if the path is not empty
  if (!path) {
    return errorHandler("path must not be empty", TypeError);
  }

  // Check if the path is a relative path using validateRelativePath.isNotRelative
  if (validateRelativePathString.isNotRelative(path)) {
    return errorHandler(`path should be a \`path.relative()\`d string, but got \"${originalInput}\"`, RangeError);
  }

  // All validations passed
  return true;
}

// Attach the isNotRelative method from the original validateRelativePath function for compatibility
validateRelativePathString.isNotRelative = validateRelativePath.isNotRelative;

module.exports = validateRelativePathString;