/**
 * Joins an array of strings into a single string, separated by a specified separator,
 * but ensures that the resulting string does not exceed a maximum allowed length.
 * If adding the next item would exceed the limit, the previous result is returned.
 *
 * @param {string[]} items - The array of strings to join.
 * @param {string} separator - The separator to use between items.
 * @param {number} maxTotalLength - The maximum allowed length of the resulting string.
 * @returns {string} The joined string, not exceeding the maximum length.
 */
function joinWithSeparatorAndLimit(items, separator, maxTotalLength) {
  return items.reduce((joinedString, currentItem) => {
    // If joinedString is not empty, add the separator before the current item
    const candidateString = `${joinedString}${joinedString !== "" ? separator : ""}${currentItem}`;
    // If the candidate string exceeds the max length, return the previous joinedString
    return candidateString.length > maxTotalLength ? joinedString : candidateString;
  }, "");
}

module.exports = joinWithSeparatorAndLimit;