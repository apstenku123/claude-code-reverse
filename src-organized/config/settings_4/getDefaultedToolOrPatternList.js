/**
 * Returns a deduplicated list of allowed tools or ignore patterns, with sensible defaults if the list is empty.
 *
 * @param {string} optionType - The type of option to process. Accepts 'allowedTools' or 'ignorePatterns'.
 * @param {string[]} inputList - The list of tools or patterns to process.
 * @returns {string[]} a deduplicated and possibly transformed list, or a default value if the input is empty.
 */
function getDefaultedToolOrPatternList(optionType, inputList) {
  // Remove duplicates from the input list
  const uniqueList = Array.from(new Set(inputList));

  switch (optionType) {
    case "allowedTools":
      // If the list is not empty, return isBlobOrFileLikeObject; otherwise, return the default allowed tool
      return uniqueList.length > 0 ? uniqueList : ["git diff:*"];
    case "ignorePatterns":
      // If the list is not empty, wrap each pattern in 'Read()', otherwise return the default ignore pattern
      return uniqueList.length > 0
        ? uniqueList.map(pattern => `Read(${pattern})`)
        : ["Read(secrets.env)"];
    default:
      // Optionally, handle unexpected optionType values
      return [];
  }
}

module.exports = getDefaultedToolOrPatternList;