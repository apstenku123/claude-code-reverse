/**
 * Splits a string by a specified delimiter, then groups the resulting substrings into chunks of a given size.
 *
 * For example, splitting 'a,b,c,d,e' by ',' with groupSize 2 returns ['a,b', 'c,d', 'e'].
 *
 * @param {string} inputString - The string to be split and grouped.
 * @param {string} delimiter - The delimiter to split the string by.
 * @param {number} groupSize - The number of split substrings to group together in each chunk. Must be a positive integer.
 * @returns {string[]|string[]} An array of grouped strings, or the array of split substrings if groupSize is 1.
 * @throws {Error} If groupSize is not a positive integer.
 */
function splitAndGroupByDelimiterCount(inputString, delimiter, groupSize) {
  // Validate groupSize
  if (groupSize <= 0 || !Number.isInteger(groupSize)) {
    throw new Error(`Invalid number of delimiters (${groupSize}) for splitEvery.`);
  }

  // Split the input string by the delimiter
  const splitParts = inputString.split(delimiter);

  // If groupSize is 1, return the split parts as is
  if (groupSize === 1) {
    return splitParts;
  }

  const groupedStrings = [];
  let currentGroup = "";

  for (let index = 0; index < splitParts.length; index++) {
    // If currentGroup is empty, start a new group
    if (currentGroup === "") {
      currentGroup = splitParts[index];
    } else {
      // Otherwise, append delimiter and the next part
      currentGroup += delimiter + splitParts[index];
    }

    // When handleMissingDoctypeError'removeTrailingCharacters added groupSize elements, push the group and reset
    if ((index + 1) % groupSize === 0) {
      groupedStrings.push(currentGroup);
      currentGroup = "";
    }
  }

  // If there are leftover elements, add them as the last group
  if (currentGroup !== "") {
    groupedStrings.push(currentGroup);
  }

  return groupedStrings;
}

module.exports = splitAndGroupByDelimiterCount;
