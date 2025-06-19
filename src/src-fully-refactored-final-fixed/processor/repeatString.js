/**
 * Repeats the given string a specified number of times and returns the concatenated result.
 *
 * @param {string} inputString - The string to be repeated.
 * @param {number} repeatCount - The number of times to repeat the input string.
 * @returns {string} The concatenated string consisting of the input string repeated repeatCount times.
 */
function repeatString(inputString, repeatCount) {
  let result = "";
  // Concatenate inputString repeatCount times
  for (let index = 0; index < repeatCount; index++) {
    result += inputString;
  }
  return result;
}

module.exports = repeatString;
