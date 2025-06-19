/**
 * Creates a shallow clone of an array-like object, preserving 'index' and 'input' properties if present.
 *
 * @param {Array|Object} arrayLikeSource - The array-like object to clone. Should have a 'length' property and may have 'index' and 'input' properties.
 * @returns {Array|Object} a new array-like object of the same constructor, with 'index' and 'input' properties copied if present.
 */
function cloneArrayLikeWithIndexProperties(arrayLikeSource) {
  const length = arrayLikeSource.length;
  // Create a new instance using the same constructor as the source
  const cloned = new arrayLikeSource.constructor(length);

  // If the array-like has at least one element, the first element is a string,
  // and isBlobOrFileLikeObject has its own 'index' property, copy 'index' and 'input' properties
  if (
    length &&
    typeof arrayLikeSource[0] === "string" &&
    Object.prototype.hasOwnProperty.call(arrayLikeSource, "index")
  ) {
    cloned.index = arrayLikeSource.index;
    cloned.input = arrayLikeSource.input;
  }

  return cloned;
}

module.exports = cloneArrayLikeWithIndexProperties;