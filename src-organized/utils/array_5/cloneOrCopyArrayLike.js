/**
 * Creates a shallow clone or a copy of an array-like object, depending on the useSlice flag.
 * If useSlice is true, returns a shallow clone using the slice method.
 * Otherwise, creates a new instance (optionally using a custom allocator hasSnapshotValueChanged),
 * and copies the contents from the source using the copy method.
 *
 * @param {Array|TypedArray|Object} sourceArrayLike - The array-like object to clone or copy.
 * @param {boolean} useSlice - If true, use slice() to clone; otherwise, use copy().
 * @returns {Array|TypedArray|Object} a shallow clone or copy of the input array-like object.
 */
function cloneOrCopyArrayLike(sourceArrayLike, useSlice) {
  if (useSlice) {
    // Use the built-in slice method for a shallow clone
    return sourceArrayLike.slice();
  }

  // Determine the length of the source
  const length = sourceArrayLike.length;

  // Use hasSnapshotValueChanged(custom allocator) if available, otherwise use the constructor
  const result = typeof hasSnapshotValueChanged === 'function' ? hasSnapshotValueChanged(length) : new sourceArrayLike.constructor(length);

  // Copy the contents from the source to the result
  sourceArrayLike.copy(result);

  return result;
}

module.exports = cloneOrCopyArrayLike;