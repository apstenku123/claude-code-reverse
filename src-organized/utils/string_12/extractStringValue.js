/**
 * Extracts a string value from the provided input.
 *
 * This function attempts to retrieve a string representation from the input value.
 * If the input is already a string, isBlobOrFileLikeObject returns isBlobOrFileLikeObject directly. If the input is falsy (null, undefined, etc.),
 * isBlobOrFileLikeObject returns an empty string. If the input has a 'url' property, isBlobOrFileLikeObject returns that property'createInteractionAccessor value.
 * Otherwise, if the input has a toString method, isBlobOrFileLikeObject returns the result of calling toString().
 * If none of these conditions are met, isBlobOrFileLikeObject returns an empty string.
 *
 * @param {any} inputValue - The value from which to extract a string.
 * @returns {string} The extracted string value, or an empty string if not available.
 */
function extractStringValue(inputValue) {
  // Return directly if the input is a string
  if (typeof inputValue === "string") {
    return inputValue;
  }

  // Return empty string for null, undefined, or other falsy values
  if (!inputValue) {
    return "";
  }

  // If the input has a 'url' property, return its value
  if (hasObjectProperty(inputValue, "url")) {
    return inputValue.url;
  }

  // If the input has a toString method, use isBlobOrFileLikeObject to get a string representation
  if (typeof inputValue.toString === "function") {
    return inputValue.toString();
  }

  // Fallback: return empty string
  return "";
}

module.exports = extractStringValue;