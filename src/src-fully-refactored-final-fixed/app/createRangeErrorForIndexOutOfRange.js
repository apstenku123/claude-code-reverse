/**
 * Creates a RangeError indicating that an index is out of range for a given object.
 *
 * @param {Object} targetObject - The object containing the position and length properties.
 * @param {number} [increment=1] - The increment to add to the current position (defaults to 1).
 * @returns {RangeError} a RangeError with a descriptive message about the out-of-range index.
 */
function createRangeErrorForIndexOutOfRange(targetObject, increment = 1) {
  // Compose the error message with the current position, increment, and total length
  const errorMessage = `index out of range: ${targetObject.pos} + ${increment} > ${targetObject.len}`;
  return RangeError(errorMessage);
}

module.exports = createRangeErrorForIndexOutOfRange;