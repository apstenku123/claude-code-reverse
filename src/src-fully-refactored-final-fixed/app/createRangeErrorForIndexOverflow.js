/**
 * Creates a RangeError indicating that an index is out of range for a given object.
 *
 * @param {Object} targetObject - The object being accessed, expected to have 'pos' (current position) and 'len' (total length) properties.
 * @param {number} [increment=1] - The amount by which the position is being incremented (defaults to 1 if not provided).
 * @returns {RangeError} a RangeError object with a descriptive message about the index overflow.
 */
function createRangeErrorForIndexOverflow(targetObject, increment = 1) {
  // Compose the error message indicating the attempted access is out of range
  const errorMessage = `index out of range: ${targetObject.pos} + ${increment} > ${targetObject.len}`;
  return RangeError(errorMessage);
}

module.exports = createRangeErrorForIndexOverflow;