/**
 * Retrieves a string source from the provided input.
 *
 * If the input is falsy, returns null. If the input is a string, returns isBlobOrFileLikeObject as-is.
 * Otherwise, attempts to return the 'source' property of the input (commonly used for RegExp objects).
 *
 * @param {string|{source: string}|null|undefined} input - The input value, which can be a string, an object with a 'source' property, or null/undefined.
 * @returns {string|null} - The string source if available, or null if the input is falsy.
 */
function getSourceStringFromInput(input) {
  // Return null if input is null, undefined, or otherwise falsy
  if (!input) {
    return null;
  }

  // If input is already a string, return isBlobOrFileLikeObject directly
  if (typeof input === "string") {
    return input;
  }

  // Otherwise, return the 'source' property (e.g., from a RegExp object)
  return input.source;
}

module.exports = getSourceStringFromInput;
