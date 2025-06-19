/**
 * Retrieves an interaction entry from the lI5 mapping by its key.
 *
 * @param {string} entryKey - The key associated with the desired interaction entry.
 * @returns {*} The interaction entry corresponding to the provided key, or undefined if not found.
 */
const getInteractionEntryByKey = (entryKey) => {
  // Access the lI5 mapping using the provided key
  return lI5[entryKey];
};

module.exports = getInteractionEntryByKey;