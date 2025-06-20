/**
 * Splits a string by a specified delimiter, then groups the resulting substrings into arrays of a given size.
 *
 * For example, splitting 'a,b,c,d,e' by ',' with groupSize 2 will yield ['a,b', 'c,d', 'e'].
 *
 * @param {string} inputString - The string to be split and grouped.
 * @param {string} delimiter - The delimiter to split the string by.
 * @param {number} groupSize - The number of substrings to group together after splitting.
 * @returns {string[]} An array of grouped substrings, each joined by the delimiter.
 * @throws {Error} If groupSize is not a positive integer.
 */
function splitAndGroupByDelimiterCount(inputString, delimiter, groupSize) {
  // Validate groupSize
  if (groupSize <= 0 || !Number.isInteger(groupSize)) {
    throw new Error(
      `Invalid number of delimiters (${groupSize}) for splitAndGroupByDelimiterCount.`
    );
  }

  // Split the input string by the delimiter
  const splitParts = inputString.split(delimiter);

  // If groupSize is 1, return the split parts as is
  if (groupSize === 1) {
    return splitParts;
  }

  const groupedSubstrings = [];
  let currentGroup = "";

  for (let index = 0; index < splitParts.length; index++) {
    // If currentGroup is empty, start a new group with the current part
    if (currentGroup === "") {
      currentGroup = splitParts[index];
    } else {
      // Otherwise, append the delimiter and the current part
      currentGroup += delimiter + splitParts[index];
    }

    // When handleMissingDoctypeError'removeTrailingCharacters added groupSize elements, push the group and reset
    if ((index + 1) % groupSize === 0) {
      groupedSubstrings.push(currentGroup);
      currentGroup = "";
    }
  }

  // If there are leftover elements, add them as the last group
  if (currentGroup !== "") {
    groupedSubstrings.push(currentGroup);
  }

  return groupedSubstrings;
}

module.exports = splitAndGroupByDelimiterCount;
