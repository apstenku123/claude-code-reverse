/**
 * Creates a RangeError indicating that an index is out of range for a given object.
 *
 * @param {Object} targetObject - The object being accessed, expected to have 'pos' (current position) and 'len' (total length) properties.
 * @param {number} [increment=1] - The increment or offset being added to the current position. Defaults to 1 if not provided.
 * @returns {RangeError} a RangeError with a descriptive message about the index being out of range.
 */
function createIndexOutOfRangeError(targetObject, increment = 1) {
  // Compose the error message with current position, increment, and total length
  const errorMessage = `index out of range: ${targetObject.pos} + ${increment} > ${targetObject.len}`;
  return RangeError(errorMessage);
}

module.exports = createIndexOutOfRangeError;