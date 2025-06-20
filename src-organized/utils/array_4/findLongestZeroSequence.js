/**
 * Finds the longest contiguous sequence of zeroes in an array and returns its starting index and length.
 *
 * @param {number[]} inputArray - The array of numbers to search for zero sequences.
 * @returns {{ idx: number|null, len: number }} An object containing the starting index (idx) of the longest zero sequence and its length (len). If no zero sequence is found, idx is null and len is 1.
 */
function findLongestZeroSequence(inputArray) {
  let longestZeroStartIndex = null; // Starting index of the longest zero sequence found so far
  let longestZeroLength = 1;        // Length of the longest zero sequence found so far (minimum is 1 per original logic)
  let currentZeroStartIndex = null; // Starting index of the current zero sequence
  let currentZeroLength = 0;        // Length of the current zero sequence

  for (let currentIndex = 0; currentIndex < inputArray.length; ++currentIndex) {
    if (inputArray[currentIndex] !== 0) {
      // End of a zero sequence
      if (currentZeroLength > longestZeroLength) {
        longestZeroStartIndex = currentZeroStartIndex;
        longestZeroLength = currentZeroLength;
      }
      // Reset current zero sequence trackers
      currentZeroStartIndex = null;
      currentZeroLength = 0;
    } else {
      // Part of a zero sequence
      if (currentZeroStartIndex === null) {
        currentZeroStartIndex = currentIndex;
      }
      ++currentZeroLength;
    }
  }

  // Check if the last sequence at the end of the array is the longest
  if (currentZeroLength > longestZeroLength) {
    longestZeroStartIndex = currentZeroStartIndex;
    longestZeroLength = currentZeroLength;
  }

  return {
    idx: longestZeroStartIndex,
    len: longestZeroLength
  };
}

module.exports = findLongestZeroSequence;