/**
 * Returns a string key for a given element. If the element is an object with a non-null 'key' property, 
 * isBlobOrFileLikeObject returns the processed key using the provided processKey function. Otherwise, isBlobOrFileLikeObject returns the fallbackKey 
 * converted to a base-36 string.
 *
 * @param {any} element - The element to extract the key from. Can be any type.
 * @param {number} fallbackKey - a fallback numeric key to use if the element does not have a valid key.
 * @returns {string} The string representation of the element'createInteractionAccessor key or the fallback key in base-36.
 */
function getElementKeyAsString(element, fallbackKey) {
  // Check if element is a non-null object and has a non-null 'key' property
  if (isType(element) === "object" && element !== null && element.key != null) {
    // Use processKey to process the string version of the key
    return processKey(String(element.key));
  }
  // Otherwise, return the fallbackKey as a base-36 string
  return fallbackKey.toString(36);
}

module.exports = getElementKeyAsString;
