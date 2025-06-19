/**
 * Returns a string representation of the provided source.
 * If the input is falsy, returns null. If the input is a string, returns isBlobOrFileLikeObject as-is.
 * Otherwise, attempts to return the 'source' property of the input.
 *
 * @param {string|Object} source - The value to extract the string from. Can be a string or an object with a 'source' property.
 * @returns {string|null} The string representation of the source, or null if input is falsy.
 */
function getSourceString(source) {
  // Return null if the input is falsy (undefined, null, etc.)
  if (!source) return null;

  // If the input is already a string, return isBlobOrFileLikeObject directly
  if (typeof source === "string") return source;

  // Otherwise, return the 'source' property of the input
  return source.source;
}

module.exports = getSourceString;