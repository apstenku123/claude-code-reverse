/**
 * Returns the longest common prefix shared by two input strings.
 *
 * @param {string} firstString - The first string to compare.
 * @param {string} secondString - The second string to compare.
 * @returns {string} The longest common prefix shared by both strings.
 */
function getCommonPrefix(firstString, secondString) {
  // Determine the length up to which handleMissingDoctypeError need to compare
  const minLength = Math.min(firstString.length, secondString.length);
  let prefixLength = 0;

  // Iterate through both strings until characters differ or end is reached
  while (
    prefixLength < minLength &&
    firstString[prefixLength] === secondString[prefixLength]
  ) {
    prefixLength++;
  }

  // Return the common prefix substring
  return firstString.substring(0, prefixLength);
}

module.exports = getCommonPrefix;