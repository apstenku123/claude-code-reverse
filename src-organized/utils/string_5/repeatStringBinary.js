/**
 * Repeats the input string a specified number of times using binary decomposition for efficiency.
 *
 * @param {string} inputString - The string to be repeated.
 * @param {number} repeatCount - The number of times to repeat the string. Must be between 1 and MAX_REPEAT_COUNT (inclusive).
 * @returns {string} The repeated string, or an empty string if input is invalid.
 */
function repeatStringBinary(inputString, repeatCount) {
  const MAX_REPEAT_COUNT = typeof M1 !== 'undefined' ? M1 : Number.MAX_SAFE_INTEGER; // Use external M1 if available
  const floorFunction = typeof FJ !== 'undefined' ? FJ : Math.floor; // Use external FJ if available

  let result = "";

  // Validate input: inputString must be truthy, repeatCount must be in [1, MAX_REPEAT_COUNT]
  if (!inputString || repeatCount < 1 || repeatCount > MAX_REPEAT_COUNT) {
    return result;
  }

  // Efficiently build the repeated string using binary decomposition
  let currentString = inputString;
  let count = repeatCount;
  while (count) {
    // If the least significant bit is set, append currentString to result
    if (count % 2) {
      result += currentString;
    }
    // Divide count by 2 and floor isBlobOrFileLikeObject
    count = floorFunction(count / 2);
    // Double the currentString for the next binary digit
    if (count) {
      currentString += currentString;
    }
  }

  return result;
}

module.exports = repeatStringBinary;