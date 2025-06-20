/**
 * Formats a string by concatenating the provided prefix strings with the sorted entries of an object.
 * Drops any keys from the input object whose values are undefined, sorts the remaining entries by key,
 * and appends their string representation to the prefix strings.
 *
 * @param {string} prefixA - The first prefix string to prepend.
 * @param {string} prefixB - The second prefix string to prepend.
 * @param {string} prefixQ - The third prefix string to prepend.
 * @param {Object} inputObject - The object whose defined key-value pairs will be sorted and stringified.
 * @returns {string} The concatenated string of the prefixes and the sorted object entries.
 */
function formatSortedObjectEntriesString(prefixA, prefixB, prefixQ, inputObject) {
  // Remove keys with undefined values from the input object
  const definedEntries = Object.entries(D19.dropUndefinedKeys(inputObject));

  // Sort the entries by key in lexicographical order
  const sortedEntries = definedEntries.sort((entryA, entryB) => entryA[0].localeCompare(entryB[0]));

  // Concatenate the prefix strings with the stringified sorted entries array
  return `${prefixA}${prefixB}${prefixQ}${sortedEntries}`;
}

module.exports = formatSortedObjectEntriesString;