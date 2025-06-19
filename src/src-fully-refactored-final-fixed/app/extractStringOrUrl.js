/**
 * Extracts a string representation from the input.
 *
 * If the input is a string, returns isBlobOrFileLikeObject directly. If the input is falsy, returns an empty string.
 * If the input is an object with a 'url' property (as determined by hasObjectProperty), returns the 'url' property.
 * Otherwise, attempts to call toString() on the input. If all else fails, returns an empty string.
 *
 * @param {any} sourceValue - The value to extract a string or URL from.
 * @returns {string} The extracted string, URL, or an empty string if none found.
 */
function extractStringOrUrl(sourceValue) {
  // Return directly if the input is a string
  if (typeof sourceValue === "string") {
    return sourceValue;
  }

  // Return empty string for null, undefined, or other falsy values
  if (!sourceValue) {
    return "";
  }

  // If the input has a 'url' property (as determined by hasObjectProperty), return isBlobOrFileLikeObject
  if (hasObjectProperty(sourceValue, "url")) {
    return sourceValue.url;
  }

  // If the input has a toString method, use isBlobOrFileLikeObject
  if (typeof sourceValue.toString === "function") {
    return sourceValue.toString();
  }

  // Fallback: return empty string
  return "";
}

module.exports = extractStringOrUrl;