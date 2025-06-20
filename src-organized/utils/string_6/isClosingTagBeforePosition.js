/**
 * Determines if the last occurrence of a specific closing tag in the source string appears before a given position.
 * Caches the found position in the provided cache object to avoid redundant searches.
 *
 * @param {string} sourceString - The string to search for the closing tag.
 * @param {number} positionThreshold - The position in the string to compare the closing tag'createInteractionAccessor index against.
 * @param {string} tagName - The tag name to search for (without angle brackets or slash).
 * @param {Object} closingTagIndexCache - An object used to cache the last found index of the closing tag for each tag name.
 * @returns {boolean} True if the last occurrence of the closing tag is before the positionThreshold, false otherwise.
 */
function isClosingTagBeforePosition(sourceString, positionThreshold, tagName, closingTagIndexCache) {
  // Retrieve cached index if available
  let closingTagIndex = closingTagIndexCache[tagName];

  if (closingTagIndex == null) {
    // Search for the last occurrence of the full closing tag (e.g., </div>)
    closingTagIndex = sourceString.lastIndexOf(`</${tagName}>`);
    // If not found before the threshold, search for incomplete closing tag (e.g., </div)
    if (closingTagIndex < positionThreshold) {
      closingTagIndex = sourceString.lastIndexOf(`</${tagName}`);
    }
    // Cache the found index for future calls
    closingTagIndexCache[tagName] = closingTagIndex;
  }

  // Return true if the closing tag is before the specified position
  return closingTagIndex < positionThreshold;
}

module.exports = isClosingTagBeforePosition;