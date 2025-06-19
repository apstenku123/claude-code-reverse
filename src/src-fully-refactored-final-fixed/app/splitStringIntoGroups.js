/**
 * Splits a string into groups of substrings, each group containing a specified number of segments separated by a delimiter.
 *
 * @param {string} inputString - The string to be split and grouped.
 * @param {string} delimiter - The delimiter to split the string by.
 * @param {number} groupSize - The number of segments per group.
 * @returns {string[]} An array of grouped substrings, each containing up to groupSize segments joined by the delimiter.
 * @throws {Error} If groupSize is not a positive integer.
 */
function splitStringIntoGroups(inputString, delimiter, groupSize) {
  // Validate groupSize: must be a positive integer
  if (groupSize <= 0 || !Number.isInteger(groupSize)) {
    throw new Error(
      `Invalid number of delimiters (${groupSize}) for splitEvery.`
    );
  }

  // Split the input string by the delimiter
  const segments = inputString.split(delimiter);

  // If only one group is requested, return all segments as an array
  if (groupSize === 1) {
    return segments;
  }

  const groupedStrings = [];
  let currentGroup = "";

  for (let index = 0; index < segments.length; index++) {
    // If starting a new group, initialize with the current segment
    if (currentGroup === "") {
      currentGroup = segments[index];
    } else {
      // Otherwise, append the delimiter and the current segment
      currentGroup += delimiter + segments[index];
    }

    // When handleMissingDoctypeError'removeTrailingCharacters added groupSize segments, push the group and reset
    if ((index + 1) % groupSize === 0) {
      groupedStrings.push(currentGroup);
      currentGroup = "";
    }
  }

  // If there are leftover segments, add them as the last group
  if (currentGroup !== "") {
    groupedStrings.push(currentGroup);
  }

  return groupedStrings;
}

module.exports = splitStringIntoGroups;
