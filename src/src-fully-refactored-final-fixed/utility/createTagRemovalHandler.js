/**
 * Creates a handler for removing specified tags from a string, tracking their positions for later removal.
 *
 * @param {Array|string} tagsToRemove - An array of tag names to remove, or a single tag name as a string.
 * @param {Function} [onIgnoreTagCallback] - Optional callback invoked for tags not in the removal list.
 * @returns {Object} An object with `onIgnoreTag` and `remove` methods.
 */
function createTagRemovalHandler(tagsToRemove, onIgnoreTagCallback) {
  // If no callback provided, use a no-op function
  if (typeof onIgnoreTagCallback !== "function") {
    onIgnoreTagCallback = function () {};
  }

  // If tagsToRemove is not an array, treat as a single tag
  const isSingleTag = !Array.isArray(tagsToRemove);

  /**
   * Determines if a tag should be removed.
   * @param {string} tagName
   * @returns {boolean}
   */
  function shouldRemoveTag(tagName) {
    if (isSingleTag) return true;
    // tF1.indexOf is assumed to be Array.prototype.indexOf
    return tF1.indexOf(tagsToRemove, tagName) !== -1;
  }

  /**
   * Stores [start, end] positions of removed tag blocks
   * @type {Array<[number, number]>}
   */
  const removedTagRanges = [];
  // Tracks the start position of the current tag block being removed
  let currentTagStart = false;

  return {
    /**
     * Handler for ignored tags during parsing.
     *
     * @param {string} tagName - The tag name encountered.
     * @param {*} tagAttributes - Attributes of the tag (unused here).
     * @param {Object} tagInfo - Info about the tag, including position and isClosing.
     * @returns {string|undefined} Replacement string for the tag, or result of callback.
     */
    onIgnoreTag: function (tagName, tagAttributes, tagInfo) {
      if (shouldRemoveTag(tagName)) {
        if (tagInfo.isClosing) {
          // For closing tag, mark the end of the removed block
          const closingReplacement = "[/removed]";
          const endPosition = tagInfo.position + closingReplacement.length;
          // Record the range for later removal
          removedTagRanges.push([
            currentTagStart !== false ? currentTagStart : tagInfo.position,
            endPosition
          ]);
          currentTagStart = false;
          return closingReplacement;
        } else {
          // For opening tag, mark the start position
          if (!currentTagStart) currentTagStart = tagInfo.position;
          return "[removed]";
        }
      } else {
        // Delegate to provided callback for tags not being removed
        return onIgnoreTagCallback(tagName, tagAttributes, tagInfo);
      }
    },

    /**
     * Removes all marked tag blocks from the input string.
     *
     * @param {string} input - The string to process.
     * @returns {string} The string with removed tag blocks.
     */
    remove: function (input) {
      let result = "";
      let lastIndex = 0;
      // tF1.forEach is assumed to be Array.prototype.forEach
      tF1.forEach(removedTagRanges, function (range) {
        result += input.slice(lastIndex, range[0]);
        lastIndex = range[1];
      });
      result += input.slice(lastIndex);
      return result;
    }
  };
}

module.exports = createTagRemovalHandler;