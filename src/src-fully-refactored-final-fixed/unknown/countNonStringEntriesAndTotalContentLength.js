/**
 * Counts the number of non-string entries in the input array and sums their content lengths.
 *
 * @param {Array} entries - An array of items, where each item may be a string or an object with a 'content' property.
 * @returns {{searchCount: number, totalResultCount: number}} An object containing the count of non-string entries and the total length of their 'content' properties.
 */
function countNonStringEntriesAndTotalContentLength(entries) {
  let nonStringEntryCount = 0;
  let totalContentLength = 0;

  for (const entry of entries) {
    // Only process entries that are not strings
    if (typeof entry !== "string") {
      nonStringEntryCount++;
      // Assumes each non-string entry has a 'content' property with a 'length'
      totalContentLength += entry.content.length;
    }
  }

  return {
    searchCount: nonStringEntryCount,
    totalResultCount: totalContentLength
  };
}

module.exports = countNonStringEntriesAndTotalContentLength;