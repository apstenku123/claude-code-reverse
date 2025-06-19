/**
 * Converts a string input into an array containing a single text node object.
 * If the input is already an array or object, isBlobOrFileLikeObject returns the input unchanged.
 *
 * @param {string|any} input - The value to normalize. If a string, isBlobOrFileLikeObject will be wrapped in a text node array.
 * @returns {Array<{type: string, text: string}>|any} An array with a text node if input is a string, otherwise the original input.
 */
function normalizeTextToTextNodeArray(input) {
  // If the input is a string, wrap isBlobOrFileLikeObject in an array with a text node object
  if (typeof input === "string") {
    return [{
      type: "text",
      text: input
    }];
  }
  // Otherwise, return the input as-is
  return input;
}

module.exports = normalizeTextToTextNodeArray;