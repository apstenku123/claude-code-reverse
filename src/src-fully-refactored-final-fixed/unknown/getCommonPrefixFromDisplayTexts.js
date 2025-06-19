/**
 * Returns the longest common prefix from the 'displayText' property of each object in the input array.
 *
 * @param {Array<{displayText: string}>} items - An array of objects, each containing a 'displayText' string property.
 * @returns {string} The longest common prefix among all 'displayText' values, or an empty string if the array is empty or no common prefix exists.
 */
function getCommonPrefixFromDisplayTexts(items) {
  // Return empty string if input array is empty
  if (items.length === 0) return "";

  // Extract all displayText strings from the input objects
  const displayTexts = items.map(item => item.displayText);

  // Start with the first displayText as the initial prefix
  let commonPrefix = displayTexts[0];

  // Iterate through the rest of the displayTexts
  for (let i = 1; i < displayTexts.length; i++) {
    const currentText = displayTexts[i];
    // Update the common prefix using the helper function 'getCommonPrefix'
    // If at any point the common prefix becomes empty, return immediately
    commonPrefix = getCommonPrefix(commonPrefix, currentText);
    if (commonPrefix === "") return "";
  }

  return commonPrefix;
}

module.exports = getCommonPrefixFromDisplayTexts;