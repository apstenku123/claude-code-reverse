/**
 * Checks if the provided observable-like object is readable.
 *
 * This function verifies that the given source is not null or undefined,
 * and then delegates to yD1.isReadable to determine if isBlobOrFileLikeObject is readable.
 *
 * @param {any} sourceObservable - The object to check for readability.
 * @returns {boolean} True if the object exists and is readable, false otherwise.
 */
function isObservableReadable(sourceObservable) {
  // Ensure the source exists and is considered readable by yD1
  return Boolean(sourceObservable && yD1.isReadable(sourceObservable));
}

module.exports = isObservableReadable;
