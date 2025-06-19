/**
 * Repeats the given string a specified number of times.
 *
 * @param {string} stringToRepeat - The string to be repeated.
 * @param {number} repeatCount - The number of times to repeat the string.
 * @returns {string} The concatenated string consisting of the input string repeated the specified number of times.
 */
function repeatStringNTimes(stringToRepeat, repeatCount) {
  // Array(repeatCount + 1) creates an array with (repeatCount + 1) empty slots.
  // .join(stringToRepeat) inserts the string between each slot, resulting in the string repeated repeatCount times.
  return Array(repeatCount + 1).join(stringToRepeat);
}

module.exports = repeatStringNTimes;