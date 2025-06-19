/**
 * Calculates the end index of an interaction entry based on its start index and the length of its associated data.
 *
 * @param {Object} interactionEntry - The interaction entry object.
 * @param {number} interactionEntry.startIndex - The starting index of the interaction entry.
 * @param {Array} interactionEntry - The interaction entry array, where index 1 contains an object with a 'length' property.
 * @returns {number} The end index, calculated as startIndex plus the length of the associated data.
 */
function getEndIndexOfInteractionEntry(interactionEntry) {
  // Calculate the end index by adding the start index to the length of the associated data
  return interactionEntry.startIndex + interactionEntry[1].length;
}

module.exports = getEndIndexOfInteractionEntry;