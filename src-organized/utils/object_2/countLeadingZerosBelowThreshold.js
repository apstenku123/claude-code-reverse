/**
 * Counts the number of consecutive leading zeros in an array starting from a given index,
 * but only up to a specified limit. If the first non-zero value encountered is greater than or equal to
 * the threshold 'pC1', the count is decremented by one.
 *
 * @param {number[]} valuesArray - The array of numbers to inspect.
 * @param {number} startIndex - The index in the array to start checking from.
 * @param {number} endLimit - The exclusive upper bound index for checking.
 * @returns {number} The count of consecutive leading zeros found, possibly decremented if threshold is met.
 */
function countLeadingZerosBelowThreshold(valuesArray, startIndex, endLimit) {
  let zeroCount = 0;
  // Iterate while within bounds and current value is zero
  while ((startIndex + zeroCount) < endLimit && valuesArray[startIndex + zeroCount] === 0) {
    zeroCount++;
  }
  // Check if the first non-zero value is greater than or equal to the threshold
  const isAboveThreshold = valuesArray[startIndex + zeroCount] >= pC1;
  if (isAboveThreshold) {
    zeroCount--;
  }
  return zeroCount;
}

module.exports = countLeadingZerosBelowThreshold;