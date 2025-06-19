/**
 * Counts the number of non-string entries in the provided array and sums the length of their 'content' property.
 *
 * @param {Array} entries - An array of items, where each item may be a string or an object with a 'content' property.
 * @returns {{searchCount: number, totalResultCount: number}} An object containing the count of non-string entries and the total length of their 'content' properties.
 */
function countNonStringContentEntries(entries) {
  let nonStringEntryCount = 0;
  let totalContentLength = 0;

  for (const entry of entries) {
    // Only process entries that are not strings
    if (typeof entry !== "string") {
      nonStringEntryCount++;
      // Sum the length of the 'content' property
      totalContentLength += entry.content.length;
    }
  }

  return {
    searchCount: nonStringEntryCount,
    totalResultCount: totalContentLength
  };
}

module.exports = countNonStringContentEntries;