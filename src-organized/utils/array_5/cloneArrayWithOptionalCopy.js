/**
 * Creates a copy of the given array-like object. If the shallowCopy flag is true, returns a shallow copy using slice().
 * Otherwise, creates a new instance of the same constructor and copies the contents using the object'createInteractionAccessor copy() method.
 *
 * @param {Array|TypedArray} sourceArray - The array or array-like object to clone.
 * @param {boolean} shallowCopy - If true, performs a shallow copy using slice(). If false, uses the copy() method.
 * @returns {Array|TypedArray} a new array or array-like object containing the copied elements.
 */
function cloneArrayWithOptionalCopy(sourceArray, shallowCopy) {
  // If shallowCopy is true, return a shallow copy using slice()
  if (shallowCopy) {
    return sourceArray.slice();
  }

  // Determine the length of the source array
  const arrayLength = sourceArray.length;

  // Create a new array of the same type and length
  // N9A is an optional allocator function; fallback to the constructor if not present
  const newArray = typeof N9A === 'function' ? N9A(arrayLength) : new sourceArray.constructor(arrayLength);

  // Copy the contents from the source array to the new array using the copy() method
  sourceArray.copy(newArray);

  return newArray;
}

module.exports = cloneArrayWithOptionalCopy;