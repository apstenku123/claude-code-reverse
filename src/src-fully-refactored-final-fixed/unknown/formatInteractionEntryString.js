/**
 * Formats an interaction entry string by combining the first value from the e71 collection,
 * a separator, the provided interaction entry, and a suffix.
 *
 * @param {string} interactionEntry - The interaction entry to include in the formatted string.
 * @returns {string} The formatted string combining the collection value, separator, entry, and suffix.
 */
function formatInteractionEntryString(interactionEntry) {
  // Retrieve the first value from the e71 collection (assumed to be an iterable)
  const firstCollectionValue = e71.values().next().value;
  // lQ0 is assumed to be a separator string
  // iQ0 is assumed to be a suffix string
  return `${firstCollectionValue}${lQ0}${interactionEntry}${iQ0}`;
}

module.exports = formatInteractionEntryString;