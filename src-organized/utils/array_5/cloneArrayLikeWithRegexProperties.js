/**
 * Creates a shallow clone of an array-like object, preserving RegExp properties if present.
 *
 * If the input is an array-like object (such as the result of String.prototype.match),
 * and isBlobOrFileLikeObject contains RegExp-specific properties ('index' and 'input'), these properties
 * are copied to the clone as well.
 *
 * @param {ArrayLike<any>} arrayLike - The array-like object to clone. Can be a string array or a RegExp match result.
 * @returns {ArrayLike<any>} a shallow clone of the input, with 'index' and 'input' properties preserved if present.
 */
function cloneArrayLikeWithRegexProperties(arrayLike) {
  const length = arrayLike.length;
  // Create a new instance using the same constructor as the input
  const cloned = new arrayLike.constructor(length);

  // If the array-like object is non-empty, its first element is a string,
  // and isBlobOrFileLikeObject has an 'index' property (like RegExp match results),
  // copy 'index' and 'input' properties to the clone
  if (
    length &&
    typeof arrayLike[0] === "string" &&
    Object.prototype.hasOwnProperty.call(arrayLike, "index")
  ) {
    cloned.index = arrayLike.index;
    cloned.input = arrayLike.input;
  }

  return cloned;
}

module.exports = cloneArrayLikeWithRegexProperties;