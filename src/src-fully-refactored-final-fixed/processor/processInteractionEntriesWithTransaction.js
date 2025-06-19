/**
 * Iterates over an array of interaction entries, processes each entry by invoking a callback with the current transaction,
 * the entry itself, a mapped value for the entry, and the full array. Returns the final transaction object.
 *
 * @param {Array} interactionEntries - Array of interaction entries to process.
 * @param {Function} processEntryCallback - Callback function to process each entry. Receives (transaction, entry, mappedValue, allEntries).
 * @param {Function} mapEntryToValue - Function to map each entry to a value (e.g., route name).
 * @param {Object} transaction - The transaction object to be passed and potentially mutated by the callback.
 * @returns {Object} The final transaction object after processing all entries.
 */
function processInteractionEntriesWithTransaction(
  interactionEntries,
  processEntryCallback,
  mapEntryToValue,
  transaction
) {
  const entriesLength = interactionEntries == null ? 0 : interactionEntries.length;
  // Iterate over each interaction entry
  for (let index = 0; index < entriesLength; index++) {
    const entry = interactionEntries[index];
    // Call the provided callback with the transaction, current entry, mapped value, and the full array
    processEntryCallback(transaction, entry, mapEntryToValue(entry), interactionEntries);
  }
  return transaction;
}

module.exports = processInteractionEntriesWithTransaction;
