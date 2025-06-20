/**
 * Checks if a wildcard pattern or a specific value exists within a list of items.
 *
 * @param {Array<string>} itemList - The list of items to search through.
 * @param {string} valueToMatch - The specific value to match against the list.
 * @param {string} patternSuffix - The suffix to use for constructing the wildcard pattern (e.g., a domain or extension).
 * @returns {boolean} Returns true if either the wildcard pattern or the specific value is found in the list; otherwise, false.
 */
function doesPatternOrValueExistInList(itemList, valueToMatch, patternSuffix) {
  // Construct the wildcard pattern (e.g., '*.example.com')
  const wildcardPattern = `*.${patternSuffix}`;

  for (const itemKey in itemList) {
    const currentItem = itemList[itemKey];
    // Check if the current item matches either the wildcard pattern or the specific value
    if (currentItem === wildcardPattern || currentItem === valueToMatch) {
      return true;
    }
  }
  return false;
}

module.exports = doesPatternOrValueExistInList;
