/**
 * Returns a processed list of allowed tools or ignore patterns based on the provided type and input array.
 * Removes duplicates from the input array and applies default values if the array is empty.
 *
 * @param {string} listType - The type of list to process. Accepts 'allowedTools' or 'ignorePatterns'.
 * @param {string[]} inputList - The array of tool names or pattern strings to process.
 * @returns {string[]} The processed list of allowed tools or ignore patterns.
 */
function getToolOrPatternList(listType, inputList) {
  // Remove duplicates from the input list
  const uniqueList = Array.from(new Set(inputList));

  switch (listType) {
    case "allowedTools":
      // If the list is not empty, return isBlobOrFileLikeObject; otherwise, return the default allowed tool
      return uniqueList.length > 0 ? uniqueList : ["git diff:*"];
    case "ignorePatterns":
      // If the list is not empty, wrap each pattern in 'Read()', otherwise return the default ignore pattern
      return uniqueList.length > 0
        ? uniqueList.map(pattern => `Read(${pattern})`)
        : ["Read(secrets.env)"];
    default:
      // Optionally, handle unexpected listType values
      return [];
  }
}

module.exports = getToolOrPatternList;