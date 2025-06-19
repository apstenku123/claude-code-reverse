/**
 * Returns the first interaction entry from the provided array, or a default value if the array is empty or undefined.
 *
 * @param {Array} interactionEntries - An array of interaction entry objects.
 * @returns {any} The first interaction entry if available, otherwise the default processed interaction entries value.
 */
function getFirstInteractionEntryOrDefault(interactionEntries) {
  // 'processInteractionEntries' is the default value to return if no entries are present
  return interactionEntries && interactionEntries.length
    ? interactionEntries[0]
    : processInteractionEntries;
}

module.exports = getFirstInteractionEntryOrDefault;