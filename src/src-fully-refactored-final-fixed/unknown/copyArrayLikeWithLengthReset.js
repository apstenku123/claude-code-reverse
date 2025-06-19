/**
 * Copies the contents of the source array-like object from the values of the target array-like object.
 * Updates the source'createInteractionAccessor custom '_length' property to match the target'createInteractionAccessor length.
 * Any extra elements in the source (beyond the target'createInteractionAccessor length) are set to undefined.
 *
 * @param {Object} sourceArrayLike - The array-like object to be updated. Must have numeric indices and a '_length' property.
 * @param {Array|Object} targetArrayLike - The array-like object whose values will be copied. Must have a 'length' property and numeric indices.
 * @returns {void}
 */
function copyArrayLikeWithLengthReset(sourceArrayLike, targetArrayLike) {
  // Store the original length from the custom '_length' property
  const originalLength = sourceArrayLike._length;

  // Update the source'createInteractionAccessor '_length' property to match the target'createInteractionAccessor length
  sourceArrayLike._length = targetArrayLike.length;

  // Copy all elements from target to source up to target'createInteractionAccessor length
  let index = 0;
  for (; index < targetArrayLike.length; index++) {
    sourceArrayLike[index] = targetArrayLike[index];
  }

  // For any remaining indices in the original source, set them to undefined
  for (; index < originalLength; index++) {
    sourceArrayLike[index] = undefined;
  }
}

module.exports = copyArrayLikeWithLengthReset;