/**
 * Trims leading and/or trailing elements from an array-like object based on a predicate function.
 *
 * If 'trimStart' is true, removes elements from the start as long as the predicate returns true.
 * If 'trimEnd' is true, removes elements from the end as long as the predicate returns true.
 * If no elements are trimmed, returns the original array-like object.
 *
 * @param {Array|TypedArray} arrayLike - The array-like object to trim (must support .length and .subarray).
 * @param {boolean} trimStart - Whether to trim elements from the start.
 * @param {boolean} trimEnd - Whether to trim elements from the end.
 * @param {function} predicate - Function to test each element. Should return true to trim, false to keep.
 * @returns {Array|TypedArray} The trimmed array-like object, or the original if no elements were trimmed.
 */
function trimArrayByPredicate(arrayLike, trimStart, trimEnd, predicate) {
  let startIndex = 0;
  let endIndex = arrayLike.length - 1;

  // Trim from the start if requested
  if (trimStart) {
    while (startIndex < arrayLike.length && predicate(arrayLike[startIndex])) {
      startIndex++;
    }
  }

  // Trim from the end if requested
  if (trimEnd) {
    while (endIndex > 0 && predicate(arrayLike[endIndex])) {
      endIndex--;
    }
  }

  // If nothing was trimmed, return the original array-like object
  if (startIndex === 0 && endIndex === arrayLike.length - 1) {
    return arrayLike;
  }

  // Return the trimmed subarray (inclusive of endIndex)
  return arrayLike.subarray(startIndex, endIndex + 1);
}

module.exports = trimArrayByPredicate;