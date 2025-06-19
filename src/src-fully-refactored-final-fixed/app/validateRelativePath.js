/**
 * Validates that the provided path is a non-empty, relative string.
 * Calls the errorCallback with a specific error message and error type if validation fails.
 *
 * @param {string} path - The path string to validate.
 * @param {string} originalInput - The original input value for error reporting.
 * @param {function} errorCallback - Callback to invoke with an error message and error type if validation fails.
 * @returns {boolean} Returns true if the path is valid; otherwise, the errorCallback is called and its return value is returned.
 */
function validateRelativePath(path, originalInput, errorCallback) {
  // Check if the path is a string using isString utility
  if (!isString(path)) {
    return errorCallback(`path must be a string, but got \`${originalInput}\``, TypeError);
  }

  // Check if the path is not empty
  if (!path) {
    return errorCallback("path must not be empty", TypeError);
  }

  // Check if the path is a relative path using validateRelativePath.isNotRelative
  if (validateRelativePath.isNotRelative(path)) {
    return errorCallback(`path should be a \`path.relative()\`d string, but got \"${originalInput}\"`, RangeError);
  }

  // All validations passed
  return true;
}

// Attach the isNotRelative method from validateRelativePath to the refactored function for compatibility
validateRelativePath.isNotRelative = validateRelativePath.isNotRelative;

module.exports = validateRelativePath;
