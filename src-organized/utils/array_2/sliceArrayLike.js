/**
 * Returns a shallow copy of a portion of an array-like object, similar to Array.prototype.slice.
 * Handles negative start and end indices, and ensures indices are within bounds.
 *
 * @param {Array|Object} arrayLike - The array-like object to slice.
 * @param {number} startIndex - The beginning index of the specified portion (can be negative).
 * @param {number} endIndex - The end index (exclusive) of the specified portion (can be negative or greater than length).
 * @returns {Array} a new array containing the extracted elements.
 */
function sliceArrayLike(arrayLike, startIndex, endIndex) {
  let currentIndex = -1;
  const arrayLength = arrayLike.length;
  let normalizedStart = startIndex;
  let normalizedEnd = endIndex;

  // Handle negative start index
  if (normalizedStart < 0) {
    normalizedStart = -normalizedStart > arrayLength ? 0 : arrayLength + normalizedStart;
  }

  // Clamp end index to array length
  normalizedEnd = normalizedEnd > arrayLength ? arrayLength : normalizedEnd;
  // Handle negative end index
  if (normalizedEnd < 0) {
    normalizedEnd += arrayLength;
  }

  // If start is greater than end, result is empty
  const sliceLength = normalizedStart > normalizedEnd ? 0 : (normalizedEnd - normalizedStart) >>> 0;
  normalizedStart >>>= 0; // Ensure start is a non-negative integer

  // $a is assumed to be a function that creates a new array of given length
  const result = $a(sliceLength);

  // Copy elements from arrayLike to result
  while (++currentIndex < sliceLength) {
    result[currentIndex] = arrayLike[currentIndex + normalizedStart];
  }

  return result;
}

module.exports = sliceArrayLike;