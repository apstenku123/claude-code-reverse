/**
 * Counts the number of consecutive zeros in the input array starting from a given index,
 * up to a maximum index, or until a value meets or exceeds a threshold (pC1).
 * If the first non-zero value is greater than or equal to the threshold, the count is decremented by one.
 *
 * @param {number[]} inputArray - The array to search for leading zeros.
 * @param {number} startIndex - The index to start searching from.
 * @param {number} maxIndex - The exclusive upper bound index for searching.
 * @returns {number} The count of consecutive zeros found, possibly adjusted if the threshold is met.
 */
function countLeadingZerosUntilThreshold(inputArray, startIndex, maxIndex) {
  let zeroCount = 0;

  // Iterate through the array starting from startIndex, counting zeros
  while (
    startIndex + zeroCount < maxIndex &&
    inputArray[startIndex + zeroCount] === 0
  ) {
    zeroCount++;
  }

  // Check if the first non-zero value meets or exceeds the threshold (pC1)
  const meetsThreshold = inputArray[startIndex + zeroCount] >= pC1;
  if (meetsThreshold) {
    // If so, decrement the zero count by one
    zeroCount--;
  }

  return zeroCount;
}

module.exports = countLeadingZerosUntilThreshold;