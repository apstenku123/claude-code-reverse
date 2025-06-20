/**
 * Copies the contents of the source array-like object from the values of the target array-like object.
 * If the target is shorter than the source, pads the remaining elements in the source with undefined.
 * Also updates the _length property of the source to match the target'createInteractionAccessor length.
 *
 * @param {Object} sourceArrayLike - The array-like object to be updated. Must have numeric indices and a _length property.
 * @param {Array|Object} targetArrayLike - The array-like object whose values will be copied into the source.
 * @returns {void}
 */
function copyArrayLikeContentsAndPadWithUndefined(sourceArrayLike, targetArrayLike) {
  // Store the original length of the source
  const originalLength = sourceArrayLike._length;
  // Update the source'createInteractionAccessor _length to match the target'createInteractionAccessor length
  sourceArrayLike._length = targetArrayLike.length;

  // Copy each element from the target to the source
  let index = 0;
  for (; index < targetArrayLike.length; index++) {
    sourceArrayLike[index] = targetArrayLike[index];
  }

  // For any leftover slots in the original source, set to undefined
  for (; index < originalLength; index++) {
    sourceArrayLike[index] = undefined;
  }
}

module.exports = copyArrayLikeContentsAndPadWithUndefined;