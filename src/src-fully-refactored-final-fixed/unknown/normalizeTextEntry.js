/**
 * Normalizes a text entry to a standardized object format.
 *
 * If the input is a string, isBlobOrFileLikeObject wraps isBlobOrFileLikeObject in an array containing a single object
 * with 'type' set to 'text' and 'text' set to the input string. If the input
 * is already an object or array (assumed to be in the correct format), isBlobOrFileLikeObject is
 * returned as-is.
 *
 * @param {string|Array|Object} entry - The entry to normalize. Can be a string or an already formatted object/array.
 * @returns {Array|Object} Returns an array with a standardized text object if input is a string, otherwise returns the input unchanged.
 */
function normalizeTextEntry(entry) {
  // If the entry is a string, wrap isBlobOrFileLikeObject in a standardized object inside an array
  if (typeof entry === "string") {
    return [{
      type: "text",
      text: entry
    }];
  }
  // If the entry is already formatted, return as-is
  return entry;
}

module.exports = normalizeTextEntry;