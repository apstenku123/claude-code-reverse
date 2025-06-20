/**
 * Calculates the sum of a segment of an array, starting at a given index, and for each subsequent element in the segment,
 * adds 1 plus the value of the element to the running total.
 *
 * @param {number[]} array - The source array of numbers to sum from.
 * @param {number} startIndex - The index in the array to start summing from.
 * @param {number} segmentLength - The number of elements to include in the segment (including the start index).
 * @returns {number} The calculated sum as described.
 */
function sumArraySegmentWithIncrement(array, startIndex, segmentLength) {
  // Initialize the sum with the value at the starting index
  let sum = array[startIndex];

  // For each subsequent element in the segment, add 1 plus the element'createInteractionAccessor value to the sum
  for (let offset = 1; offset < segmentLength; offset++) {
    sum += 1 + array[startIndex + offset];
  }

  return sum;
}

module.exports = sumArraySegmentWithIncrement;