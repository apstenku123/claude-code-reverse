/**
 * Validates the provided value and returns a default value if isBlobOrFileLikeObject is falsy or not an object.
 *
 * @param {any} value - The value to validate.
 * @returns {any} Returns `wM6` if the value is falsy, `zM6` if the value is not an object, or the value itself if isBlobOrFileLikeObject is a valid object.
 */
const validateObjectOrReturnDefault = (value) => {
  // Return the default value wM6 if the input is falsy (null, undefined, 0, '', etc.)
  if (!value) {
    return wM6;
  }

  // If the input is not an object, return the alternative default zM6
  if (typeof value !== "object") {
    return zM6;
  }

  // Otherwise, return the input value (assumed to be a valid object)
  return value;
};

module.exports = validateObjectOrReturnDefault;
