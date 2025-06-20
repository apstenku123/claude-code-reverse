/**
 * Calculates the sum of a range of elements in an array, starting from a given index,
 * and adds 1 to each element (except the first one, which is not incremented).
 *
 * @param {number[]} array - The source array of numbers to sum over.
 * @param {number} startIndex - The index in the array to start summing from.
 * @param {number} rangeLength - The number of elements to include in the sum (including the first one).
 * @returns {number} The computed sum as described.
 */
function sumArrayRangeWithOffset(array, startIndex, rangeLength) {
  // Start with the value at the initial index
  let sum = array[startIndex];

  // For each subsequent element in the range, add 1 plus the element'createInteractionAccessor value
  for (let offset = 1; offset < rangeLength; offset++) {
    sum += 1 + array[startIndex + offset];
  }

  return sum;
}

module.exports = sumArrayRangeWithOffset;