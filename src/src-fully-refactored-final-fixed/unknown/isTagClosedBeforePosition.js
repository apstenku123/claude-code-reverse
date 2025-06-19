/**
 * Checks if the closing tag for a given tag name appears before a specified position in the source string.
 * Caches the last found position for efficiency.
 *
 * @param {string} source - The string to search within (e.g., HTML/XML source).
 * @param {number} position - The position to compare against (typically an index in the source string).
 * @param {string} tagName - The tag name to search for (without angle brackets).
 * @param {Object.<string, number|null>} tagCloseCache - An object used to cache the last found index for each tag name.
 * @returns {boolean} True if the closing tag for tagName is found before the given position; otherwise, false.
 */
function isTagClosedBeforePosition(source, position, tagName, tagCloseCache) {
  // Retrieve the cached index for this tag, if any
  let lastCloseIndex = tagCloseCache[tagName];

  if (lastCloseIndex == null) {
    // Search for the last occurrence of the full closing tag (e.g., </div>)
    lastCloseIndex = source.lastIndexOf(`</${tagName}>`);
    // If not found before the given position, try searching for incomplete closing tag (e.g., </div)
    if (lastCloseIndex < position) {
      lastCloseIndex = source.lastIndexOf(`</${tagName}`);
    }
    // Cache the result for future calls
    tagCloseCache[tagName] = lastCloseIndex;
  }

  // Return true if the last closing tag is before the specified position
  return lastCloseIndex < position;
}

module.exports = isTagClosedBeforePosition;