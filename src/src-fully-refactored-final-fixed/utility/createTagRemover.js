/**
 * Creates a tag remover utility that identifies and removes specified tags from a string.
 *
 * @param {Array<string>|string} tagsToRemove - An array of tag names (or a single tag name) to be removed from the input string.
 * @param {function} [onIgnoreTagCallback] - Optional callback invoked for tags not in the removal list. Receives (tagName, tagAttributes, tagInfo).
 * @returns {object} An object with two methods:
 *   - onIgnoreTag: Handles tag removal or delegates to the callback.
 *   - remove: Removes all marked tag ranges from a string.
 */
function createTagRemover(tagsToRemove, onIgnoreTagCallback) {
  // Use a no-op function if no callback is provided
  if (typeof onIgnoreTagCallback !== "function") {
    onIgnoreTagCallback = function () {};
  }

  // Determine if tagsToRemove is a single tag (not an array)
  const isSingleTag = !Array.isArray(tagsToRemove);

  /**
   * Checks if a tag should be removed.
   * @param {string} tagName
   * @returns {boolean}
   */
  function shouldRemoveTag(tagName) {
    if (isSingleTag) return true;
    // tF1.indexOf is assumed to be Array.prototype.indexOf
    return tF1.indexOf(tagsToRemove, tagName) !== -1;
  }

  /**
   * Stores ranges [start, end] of removed tags in the input string.
   * @type {Array<[number, number]>}
   */
  const removedRanges = [];
  // Tracks the start position of the current removed tag
  let currentRemovalStart = false;

  return {
    /**
     * Handles tag removal logic or delegates to the callback for non-removed tags.
     * @param {string} tagName - The tag name encountered.
     * @param {object} tagAttributes - Attributes of the tag.
     * @param {object} tagInfo - Info about the tag (e.g., position, isClosing).
     * @returns {string|undefined} Replacement string for removed tags or result of callback.
     */
    onIgnoreTag: function (tagName, tagAttributes, tagInfo) {
      if (shouldRemoveTag(tagName)) {
        if (tagInfo.isClosing) {
          // Closing tag: mark the end of the removal range
          const closingReplacement = "[/removed]";
          const removalEnd = tagInfo.position + closingReplacement.length;
          // Record the range to be removed
          removedRanges.push([
            currentRemovalStart !== false ? currentRemovalStart : tagInfo.position,
            removalEnd
          ]);
          currentRemovalStart = false;
          return closingReplacement;
        } else {
          // Opening tag: mark the start position
          if (!currentRemovalStart) currentRemovalStart = tagInfo.position;
          return "[removed]";
        }
      } else {
        // Delegate to the provided callback for tags not being removed
        return onIgnoreTagCallback(tagName, tagAttributes, tagInfo);
      }
    },

    /**
     * Removes all marked tag ranges from the input string.
     * @param {string} input - The string to process.
     * @returns {string} The string with specified tags removed.
     */
    remove: function (input) {
      let result = "";
      let lastIndex = 0;
      // tF1.forEach is assumed to be Array.prototype.forEach
      tF1.forEach(removedRanges, function (range) {
        result += input.slice(lastIndex, range[0]);
        lastIndex = range[1];
      });
      result += input.slice(lastIndex);
      return result;
    }
  };
}

module.exports = createTagRemover;