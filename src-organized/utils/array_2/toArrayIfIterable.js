/**
 * Converts an iterable or array-like object to an array if isBlobOrFileLikeObject implements an iterator.
 *
 * @param {any} sourceObject - The object to check for iterability and convert to an array.
 * @returns {Array|undefined} Returns an array if the object is iterable, otherwise undefined.
 */
function toArrayIfIterable(sourceObject) {
  // Check if Symbol is supported and the object has a Symbol.iterator property
  const hasSymbolIterator = typeof Symbol !== "undefined" && sourceObject[Symbol.iterator] != null;
  // Check for the legacy @@iterator property
  const hasLegacyIterator = sourceObject["@@iterator"] != null;

  // If the object is iterable (either via Symbol.iterator or @@iterator), convert isBlobOrFileLikeObject to an array
  if (hasSymbolIterator || hasLegacyIterator) {
    return Array.from(sourceObject);
  }
}

module.exports = toArrayIfIterable;