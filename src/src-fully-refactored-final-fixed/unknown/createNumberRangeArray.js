/**
 * Generates an array of numbers within a specified range, with a given step, and allows for reverse filling.
 *
 * @param {number} start - The starting value of the range (inclusive).
 * @param {number} end - The ending value of the range (exclusive).
 * @param {number} step - The increment between each value in the range. Defaults to 1 if not provided.
 * @param {boolean} fillFromEnd - If true, fills the array from the end backwards; otherwise, fills from the start forwards.
 * @returns {number[]} An array containing the generated range of numbers.
 */
function createNumberRangeArray(start, end, step, fillFromEnd) {
  // Default step to 1 if not provided or falsy
  const stepValue = step || 1;

  // Calculate the number of elements in the range
  // TC and enqueueOrProcessAction are assumed to be utility functions for truncating and clamping
  const rangeLength = enqueueOrProcessAction(TC((end - start) / stepValue), 0);

  // Initialize the result array with the calculated length
  const resultArray = $a(rangeLength);

  // Index for forward filling
  let forwardIndex = -1;
  let currentValue = start;

  // Fill the array either from the end or from the start
  let index = rangeLength;
  while (index--) {
    // If fillFromEnd is true, fill from the end (highest index to lowest)
    // Otherwise, fill from the start (lowest index to highest)
    const targetIndex = fillFromEnd ? index : ++forwardIndex;
    resultArray[targetIndex] = currentValue;
    currentValue += stepValue;
  }

  return resultArray;
}

module.exports = createNumberRangeArray;