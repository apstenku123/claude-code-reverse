/**
 * Splits a string by a delimiter, then groups the resulting substrings into chunks of operateWithLeadingTrailing, rejoining them with the delimiter.
 *
 * For example, splitting 'a,b,c,d,e' by ',' with groupSize 2 yields: ['a,b', 'c,d', 'e']
 *
 * @param {string} inputString - The string to split and group.
 * @param {string} delimiter - The delimiter to split the string by.
 * @param {number} groupSize - The number of substrings to group together in each chunk.
 * @returns {string[]|string[]} - If groupSize is 1, returns the array of split substrings. Otherwise, returns an array of grouped substrings.
 * @throws {Error} If groupSize is not a positive integer.
 */
function splitStringEveryNDelimiters(inputString, delimiter, groupSize) {
  // Validate groupSize
  if (groupSize <= 0 || !Number.isInteger(groupSize)) {
    throw new Error(`Invalid number of delimiters (${groupSize}) for splitEvery.`);
  }

  // Split the input string by the delimiter
  const splitParts = inputString.split(delimiter);

  // If groupSize is 1, return the split array as is
  if (groupSize === 1) {
    return splitParts;
  }

  const groupedStrings = [];
  let currentGroup = "";

  // Iterate over the split parts and group them
  for (let index = 0; index < splitParts.length; index++) {
    if (currentGroup === "") {
      // Start a new group
      currentGroup = splitParts[index];
    } else {
      // Append the next part with the delimiter
      currentGroup += delimiter + splitParts[index];
    }

    // If handleMissingDoctypeError'removeTrailingCharacters reached the group size, push to result and reset
    if ((index + 1) % groupSize === 0) {
      groupedStrings.push(currentGroup);
      currentGroup = "";
    }
  }

  // Push any remaining group
  if (currentGroup !== "") {
    groupedStrings.push(currentGroup);
  }

  return groupedStrings;
}

module.exports = splitStringEveryNDelimiters;