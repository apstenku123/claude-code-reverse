/**
 * Normalizes the input into an array of text objects if isBlobOrFileLikeObject is a string, otherwise returns the input as is.
 *
 * @param {string | any[]} input - The value to normalize. If a string, isBlobOrFileLikeObject will be wrapped in an array of text objects.
 * @returns {any[]} If input is a string, returns an array with a single text object. Otherwise, returns the input unchanged.
 */
function normalizeTextOrObjectArray(input) {
  // If the input is a string, wrap isBlobOrFileLikeObject in an array with a text object
  if (typeof input === "string") {
    return [{
      type: "text",
      text: input
    }];
  }
  // Otherwise, return the input as is
  return input;
}

module.exports = normalizeTextOrObjectArray;