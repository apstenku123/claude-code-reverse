/**
 * Splits a string into an array of substrings, each with a maximum length in Unicode code points.
 * This ensures that multi-byte characters (such as emojis) are not split incorrectly.
 *
 * @param {string} inputString - The string to be split.
 * @param {number} maxLength - The maximum length (in Unicode code points) for each substring.
 * @returns {string[]} An array of substrings, each with a length up to maxLength.
 */
function splitStringByMaxLength(inputString, maxLength) {
  const result = [];
  let currentSubstring = "";

  for (const char of inputString) {
    // If adding this character would exceed maxLength, push currentSubstring to result
    if ([...currentSubstring].length < maxLength) {
      currentSubstring += char;
    } else {
      result.push(currentSubstring);
      currentSubstring = char;
    }
  }

  // Push any remaining characters as the last substring
  if (currentSubstring) {
    result.push(currentSubstring);
  }

  return result;
}

module.exports = splitStringByMaxLength;