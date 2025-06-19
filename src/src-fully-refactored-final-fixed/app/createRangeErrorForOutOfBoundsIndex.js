/**
 * Creates a RangeError indicating that an index is out of the valid range for a given object.
 *
 * @param {Object} sourceObject - The object containing the current position and total length.
 * @param {number} [increment=1] - The increment to add to the current position (defaults to 1).
 * @returns {RangeError} a RangeError with a descriptive message about the out-of-range index.
 */
function createRangeErrorForOutOfBoundsIndex(sourceObject, increment = 1) {
  // Compose the error message with current position, increment, and total length
  const message = `index out of range: ${sourceObject.pos} + ${increment} > ${sourceObject.len}`;
  return RangeError(message);
}

module.exports = createRangeErrorForOutOfBoundsIndex;