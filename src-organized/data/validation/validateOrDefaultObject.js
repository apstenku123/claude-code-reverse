/**
 * Validates the provided value and returns appropriate defaults if invalid.
 *
 * If the input is falsy (null, undefined, false, 0, "", etc.), returns the default value `wM6`.
 * If the input is not an object (e.g., a string, number, boolean), returns the fallback value `zM6`.
 * Otherwise, returns the input value as-is.
 *
 * @param {any} inputValue - The value to validate.
 * @returns {any} Returns `wM6` if input is falsy, `zM6` if input is not an object, or the input value itself if isBlobOrFileLikeObject is a valid object.
 */
const validateOrDefaultObject = (inputValue) => {
  // Return default value if input is falsy
  if (!inputValue) return wM6;
  // Return fallback value if input is not an object
  if (typeof inputValue !== "object") return zM6;
  // Input is a valid object; return as-is
  return inputValue;
};

module.exports = validateOrDefaultObject;
