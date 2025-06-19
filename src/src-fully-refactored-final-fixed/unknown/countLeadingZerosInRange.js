/**
 * Counts the number of consecutive leading zeros in a numeric array, starting from a given index,
 * up to a specified end index. If the first non-zero value encountered is greater than or equal to
 * the threshold 'pC1', the count is decremented by one.
 *
 * @param {number[]} numericArray - The array of numbers to inspect.
 * @param {number} startIndex - The index in the array to start counting from.
 * @param {number} endIndex - The exclusive upper bound index for the search.
 * @returns {number} The count of leading zeros found in the specified range, possibly decremented by one if the first non-zero value is >= pC1.
 */
function countLeadingZerosInRange(numericArray, startIndex, endIndex) {
  let zeroCount = 0;

  // Iterate through the array starting from startIndex, counting zeros until a non-zero or endIndex is reached
  while (
    startIndex + zeroCount < endIndex &&
    numericArray[startIndex + zeroCount] === 0
  ) {
    zeroCount++;
  }

  // If the first non-zero value is >= pC1, decrement the count by one
  const isFirstNonZeroAboveThreshold = numericArray[startIndex + zeroCount] >= pC1;
  if (isFirstNonZeroAboveThreshold) {
    zeroCount--;
  }

  return zeroCount;
}

module.exports = countLeadingZerosInRange;