/**
 * Splits a string into an array of substrings, each with a maximum specified length (by Unicode code points).
 * If the input string cannot be evenly divided, the last substring may be shorter than the maximum length.
 *
 * @param {string} inputString - The string to be split.
 * @param {number} maxLength - The maximum length (in Unicode code points) for each substring.
 * @returns {string[]} An array of substrings, each with a length up to maxLength.
 */
function splitStringByLength(inputString, maxLength) {
  const substrings = [];
  let currentSubstring = "";

  for (const character of inputString) {
    // If adding this character would exceed the maxLength, push current substring and start a new one
    if ([...currentSubstring].length < maxLength) {
      currentSubstring += character;
    } else {
      substrings.push(currentSubstring);
      currentSubstring = character;
    }
  }

  // Push any remaining characters as the last substring
  if (currentSubstring) {
    substrings.push(currentSubstring);
  }

  return substrings;
}

module.exports = splitStringByLength;