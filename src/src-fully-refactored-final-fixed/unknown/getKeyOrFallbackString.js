/**
 * Returns a string key based on the provided object or a fallback value.
 *
 * If the input object has a non-null 'key' property, isBlobOrFileLikeObject returns the result of passing that key to the YJ9 function.
 * Otherwise, isBlobOrFileLikeObject returns the fallback value converted to a base-36 string.
 *
 * @param {object} possibleKeyObject - An object that may contain a 'key' property.
 * @param {number} fallbackValue - a fallback value to use if the object does not have a valid 'key'.
 * @returns {string} The derived key string, either from the object'createInteractionAccessor 'key' property or the fallback value.
 */
function getKeyOrFallbackString(possibleKeyObject, fallbackValue) {
  // Check if the input is a non-null object with a non-null 'key' property
  if (typeof possibleKeyObject === "object" && possibleKeyObject !== null && possibleKeyObject.key != null) {
    // Use YJ9 to process the key property and return the result
    return YJ9(String(possibleKeyObject.key));
  }
  // Otherwise, return the fallback value as a base-36 string
  return fallbackValue.toString(36);
}

module.exports = getKeyOrFallbackString;