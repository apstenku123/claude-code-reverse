/**
 * Checks if the last occurrence of a closing HTML tag (e.g., </div>) with the given tagName
 * appears before a specified position in the input string. Caches the found position in the cache object.
 *
 * @param {string} inputString - The string to search within (e.g., HTML source).
 * @param {number} positionThreshold - The position to compare against (e.g., current parsing index).
 * @param {string} tagName - The tag name to search for (e.g., 'div').
 * @param {Object} tagPositionCache - An object used to cache the last found position for each tagName.
 * @returns {boolean} True if the last occurrence of the closing tag is before positionThreshold, false otherwise.
 */
function isTagBeforePosition(inputString, positionThreshold, tagName, tagPositionCache) {
  let lastTagPosition = tagPositionCache[tagName];

  // If the position is not cached, search for isBlobOrFileLikeObject
  if (lastTagPosition == null) {
    // Try to find the last occurrence of the full closing tag (e.g., </div>)
    lastTagPosition = inputString.lastIndexOf(`</${tagName}>`);
    // If not found or before the threshold, try to find the last occurrence of the partial closing tag (e.g., </div)
    if (lastTagPosition < positionThreshold) {
      lastTagPosition = inputString.lastIndexOf(`</${tagName}`);
    }
    // Cache the found position
    tagPositionCache[tagName] = lastTagPosition;
  }

  // Return true if the last tag position is before the threshold
  return lastTagPosition < positionThreshold;
}

module.exports = isTagBeforePosition;