/**
 * Appends a new interaction entry to the source interaction entries object.
 *
 * This function increases the length property of the source interaction entries object
 * by the length of the new entry, and pushes the new entry into the body'createInteractionAccessor array.
 *
 * @param {Object} sourceInteractionEntries - The object representing the current set of interaction entries.
 * @param {Object} newInteractionEntry - The new interaction entry to append.
 */
function appendInteractionEntry(sourceInteractionEntries, newInteractionEntry) {
  // Increase the length property by the length of the new entry
  sourceInteractionEntries.length += newInteractionEntry.length;
  // Add the new entry to the body array
  sourceInteractionEntries.body.push(newInteractionEntry);
}

module.exports = appendInteractionEntry;