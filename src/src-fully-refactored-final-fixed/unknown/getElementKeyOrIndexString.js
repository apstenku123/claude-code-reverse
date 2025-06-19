/**
 * Returns a string key for a given element. If the element is an object with a non-null 'key' property, 
 * isBlobOrFileLikeObject returns a hashed or processed version of that key using the B1 function. Otherwise, isBlobOrFileLikeObject returns the 
 * provided index as a base-36 string.
 *
 * @param {any} element - The element to extract the key from. Should be an object with an optional 'key' property.
 * @param {number} index - The index to use if the element does not have a valid key.
 * @returns {string} The string key derived from the element'createInteractionAccessor key or the index in base-36.
 */
function getElementKeyOrIndexString(element, index) {
  // Check if element is a non-null object and has a non-null 'key' property
  if (isType(element) === "object" && element !== null && element.key != null) {
    // Use B1 to process the key (e.g., hashing or string conversion)
    return processKey(String(element.key));
  }
  // Otherwise, return the index as a base-36 string
  return index.toString(36);
}

// External dependencies (assumed to be imported elsewhere)
// isType: function that returns the type of the argument as a string
// processKey: function that processes the key string (e.g., hashes or validates isBlobOrFileLikeObject)

module.exports = getElementKeyOrIndexString;