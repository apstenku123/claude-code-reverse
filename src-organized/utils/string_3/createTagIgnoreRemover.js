/**
 * Utility to track and remove specified tags from a string, with customizable ignore logic.
 *
 * @param {Array<string>|string} tagsToIgnore - List of tag names to ignore, or a single tag name.
 * @param {Function} [onIgnoreTagCallback] - Optional callback invoked when a tag is not ignored.
 * @returns {Object} An object with `onIgnoreTag` and `remove` methods for tag processing and removal.
 */
function createTagIgnoreRemover(tagsToIgnore, onIgnoreTagCallback) {
  // Ensure the callback is a function
  if (typeof onIgnoreTagCallback !== "function") {
    onIgnoreTagCallback = function () {};
  }

  // Determine if tagsToIgnore is a single tag (not an array)
  const isSingleTag = !Array.isArray(tagsToIgnore);

  /**
   * Checks if the given tag should be ignored.
   * @param {string} tagName
   * @returns {boolean}
   */
  function shouldIgnoreTag(tagName) {
    if (isSingleTag) return true;
    // tF1.indexOf is assumed to be a utility similar to Array.prototype.indexOf
    return tF1.indexOf(tagsToIgnore, tagName) !== -1;
  }

  /**
   * Stores ranges [start, end] of removed tags in the input string.
   * @type {Array<[number, number]>}
   */
  const removedRanges = [];
  // Tracks the start position of the currently open ignored tag
  let currentTagStartPosition = false;

  return {
    /**
     * Handler to be called when a tag is encountered during parsing.
     *
     * @param {string} tagName - The name of the tag encountered.
     * @param {Object} tagAttributes - The attributes of the tag.
     * @param {Object} tagInfo - Information about the tag (e.g., position, isClosing).
     * @returns {string|undefined} Replacement string for the tag, or result of callback.
     */
    onIgnoreTag: function (tagName, tagAttributes, tagInfo) {
      if (shouldIgnoreTag(tagName)) {
        if (tagInfo.isClosing) {
          // Closing tag: mark the end of the ignored range
          const removedEndMarker = "[/removed]";
          const endPosition = tagInfo.position + removedEndMarker.length;
          // Record the range for removal
          removedRanges.push([
            currentTagStartPosition !== false ? currentTagStartPosition : tagInfo.position,
            endPosition
          ]);
          currentTagStartPosition = false;
          return removedEndMarker;
        } else {
          // Opening tag: mark the start of the ignored range
          if (!currentTagStartPosition) {
            currentTagStartPosition = tagInfo.position;
          }
          return "[removed]";
        }
      } else {
        // Not an ignored tag, delegate to callback
        return onIgnoreTagCallback(tagName, tagAttributes, tagInfo);
      }
    },

    /**
     * Removes all ignored tag ranges from the input string.
     *
     * @param {string} input - The original string to process.
     * @returns {string} The string with ignored tag ranges removed.
     */
    remove: function (input) {
      let result = "";
      let currentIndex = 0;
      // tF1.forEach is assumed to be a utility similar to Array.prototype.forEach
      tF1.forEach(removedRanges, function (range) {
        // Append the part before the removed range
        result += input.slice(currentIndex, range[0]);
        // Move index past the removed range
        currentIndex = range[1];
      });
      // Append the remainder of the string
      result += input.slice(currentIndex);
      return result;
    }
  };
}

module.exports = createTagIgnoreRemover;