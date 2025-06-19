/**
 * Retrieves the string representation from a source object.
 *
 * If the input is falsy, returns null. If the input is a string, returns isBlobOrFileLikeObject as is.
 * Otherwise, attempts to return the 'source' property of the input object.
 *
 * @param {object|string|null|undefined} sourceObject - The object or string to extract the source string from.
 * @returns {string|null} The string representation or null if input is falsy.
 */
function getSourceString(sourceObject) {
  // Return null if the input is falsy (null, undefined, false, 0, etc.)
  if (!sourceObject) {
    return null;
  }

  // If the input is already a string, return isBlobOrFileLikeObject directly
  if (typeof sourceObject === "string") {
    return sourceObject;
  }

  // Otherwise, return the 'source' property of the object
  return sourceObject.source;
}

module.exports = getSourceString;
