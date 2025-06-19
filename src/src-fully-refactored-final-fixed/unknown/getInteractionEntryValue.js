/**
 * Retrieves a string or mapped value based on the interaction entry type and index.
 *
 * Depending on the entry type, this function either returns the string representation of the entry value,
 * or looks up a value from the aI5 or sI5 arrays (using the entry value as a 1-based index).
 *
 * @param {number} entryType - The type of interaction entry. Determines how the entry value is processed.
 *   - 0 or 1: Returns entryValue as a string
 *   - 2: Returns the (entryValue - 1)th element from aI5
 *   - 3: Returns the (entryValue - 1)th element from sI5
 *   - default: Returns entryValue as a string
 * @param {number} entryValue - The value associated with the interaction entry. Used as an index for types 2 and 3.
 * @returns {string|any} The string representation or mapped value for the interaction entry.
 */
function getInteractionEntryValue(entryType, entryValue) {
  switch (entryType) {
    case 0:
    case 1:
      // For entry types 0 and 1, return the string representation of the entry value
      return entryValue.toString();
    case 2:
      // For entry type 2, return the mapped value from aI5 using (entryValue - 1) as index
      return aI5[entryValue - 1];
    case 3:
      // For entry type 3, return the mapped value from sI5 using (entryValue - 1) as index
      return sI5[entryValue - 1];
    default:
      // For any other entry type, return the string representation of the entry value
      return entryValue.toString();
  }
}

module.exports = getInteractionEntryValue;