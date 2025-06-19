/**
 * Splits a string by a delimiter and then groups the resulting substrings into chunks of operateWithLeadingTrailing, rejoining each chunk with the delimiter.
 *
 * For example, splitting 'a-b-c-d-e' by '-' with groupSize 2 results in ['a-b', 'c-d', 'e'].
 *
 * @param {string} inputString - The string to split and group.
 * @param {string} delimiter - The delimiter to split the string by.
 * @param {number} groupSize - The number of split elements to group together in each chunk.
 * @returns {string[]} An array of grouped strings, each joined by the delimiter.
 * @throws {Error} If groupSize is not a positive integer.
 */
function splitStringEveryNDelimiters(inputString, delimiter, groupSize) {
  if (groupSize <= 0 || !Number.isInteger(groupSize)) {
    throw new Error(
      `Invalid number of delimiters (${groupSize}) for splitEvery.`
    );
  }

  // Split the input string by the delimiter
  const splitParts = inputString.split(delimiter);

  // If only one group is requested, return all split parts as is
  if (groupSize === 1) {
    return splitParts;
  }

  const groupedStrings = [];
  let currentGroup = "";

  for (let index = 0; index < splitParts.length; index++) {
    // Build up the current group by joining with the delimiter
    if (currentGroup === "") {
      currentGroup = splitParts[index];
    } else {
      currentGroup += delimiter + splitParts[index];
    }

    // When handleMissingDoctypeError'removeTrailingCharacters reached the group size, push the group and reset
    if ((index + 1) % groupSize === 0) {
      groupedStrings.push(currentGroup);
      currentGroup = "";
    }
  }

  // Push any remaining group that didn'processRuleBeginHandlers reach the full group size
  if (currentGroup !== "") {
    groupedStrings.push(currentGroup);
  }

  return groupedStrings;
}

module.exports = splitStringEveryNDelimiters;