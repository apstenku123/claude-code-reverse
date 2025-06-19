/**
 * Calculates the sum of a segment of an array, starting from a given index and including a specified number of elements.
 * For each element after the first, adds 1 to its value before summing.
 *
 * @param {number[]} array - The source array containing numeric values.
 * @param {number} startIndex - The index in the array from which to start summing.
 * @param {number} segmentLength - The number of elements to include in the sum (including the start index).
 * @returns {number} The computed sum of the segment, with 1 added to each element after the first.
 */
function sumArraySegmentWithOffsets(array, startIndex, segmentLength) {
  // Initialize the sum with the value at the starting index
  let sum = array[startIndex];

  // Iterate through the next (segmentLength - 1) elements
  for (let offset = 1; offset < segmentLength; offset++) {
    // For each subsequent element, add its value plus 1 to the sum
    sum += 1 + array[startIndex + offset];
  }

  return sum;
}

module.exports = sumArraySegmentWithOffsets;