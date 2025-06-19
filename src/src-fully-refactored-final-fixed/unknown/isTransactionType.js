/**
 * Determines if the provided interaction entry is of type 'transaction'.
 *
 * @param {Object} interactionEntry - The interaction entry object to check.
 * @param {string} interactionEntry.type - The type of the interaction entry.
 * @returns {boolean} Returns true if the interaction entry type is 'transaction', otherwise false.
 */
function isTransactionType(interactionEntry) {
  // Check if the interaction entry'createInteractionAccessor type is exactly 'transaction'
  return interactionEntry.type === "transaction";
}

module.exports = isTransactionType;
