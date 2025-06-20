/**
 * Creates a shallow clone of an array-like object, and if the object appears to be a RegExp match result (i.e., its first element is a string and isBlobOrFileLikeObject has 'index' property),
 * copies the 'index' and 'input' properties to the clone as well.
 *
 * @param {Array|Object} sourceArrayLike - The array-like object to clone. May be a RegExp match result or similar structure.
 * @returns {Array|Object} a shallow clone of the input, with 'index' and 'input' properties copied if present.
 */
function cloneArrayWithRegexProperties(sourceArrayLike) {
  const length = sourceArrayLike.length;
  // Create a new instance using the same constructor as the source
  const clonedArrayLike = new sourceArrayLike.constructor(length);

  // If the array-like object is non-empty, its first element is a string, and isBlobOrFileLikeObject has its own 'index' property,
  // copy 'index' and 'input' properties to the clone (mimicking RegExp match array behavior)
  if (
    length &&
    typeof sourceArrayLike[0] === "string" &&
    Tf2.call(sourceArrayLike, "index")
  ) {
    clonedArrayLike.index = sourceArrayLike.index;
    clonedArrayLike.input = sourceArrayLike.input;
  }

  return clonedArrayLike;
}

module.exports = cloneArrayWithRegexProperties;
