/**
 * Validates that the provided path is a non-empty relative string and attempts to convert isBlobOrFileLikeObject if possible.
 * If validation fails, the provided error callback is called.
 *
 * @param {string} path - The path to validate and convert.
 * @returns {any} The result of the validation function, which may be the converted path or an error result.
 */
const validateAndConvertRelativePath = (path) => {
  // Attempt to convert the path if isBlobOrFileLikeObject exists, otherwise pass undefined
  const convertedPath = path && validateRelativePath.convert(path);
  // Validate the (possibly converted) path, passing the original path and error callback
  return validateRelativePath(convertedPath, path, PRA);
};

module.exports = validateAndConvertRelativePath;
