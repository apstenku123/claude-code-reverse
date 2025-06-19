/**
 * Creates a shallow copy of an array-like object, using either the object'createInteractionAccessor slice method or a custom constructor.
 *
 * @param {Array|TypedArray|Object} sourceArrayLike - The array-like object to clone.
 * @param {boolean} useSlice - If true, uses the slice method to clone; otherwise, uses a custom constructor and copy method.
 * @returns {Array|TypedArray|Object} a shallow copy of the input array-like object.
 */
function cloneArrayLike(sourceArrayLike, useSlice) {
  // If useSlice is true, use the slice method to create a shallow copy
  if (useSlice) {
    return sourceArrayLike.slice();
  }

  // Determine the length of the source array-like object
  const length = sourceArrayLike.length;

  // Use hasSnapshotValueChanged(custom allocator) if available, otherwise use the constructor of the source
  const allocate = typeof hasSnapshotValueChanged === 'function' ? hasSnapshotValueChanged : (len) => new sourceArrayLike.constructor(len);
  const cloned = allocate(length);

  // Use the copy method to copy contents from source to cloned object
  sourceArrayLike.copy(cloned);

  return cloned;
}

module.exports = cloneArrayLike;