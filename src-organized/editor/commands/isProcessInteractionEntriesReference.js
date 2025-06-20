/**
 * Checks if the provided value is strictly equal to the processInteractionEntries reference.
 *
 * @param {*} valueToCheck - The value to compare against the processInteractionEntries reference.
 * @returns {boolean} True if valueToCheck is the same reference as processInteractionEntries, false otherwise.
 */
function isProcessInteractionEntriesReference(valueToCheck) {
  // Compare the input value to the processInteractionEntries reference
  return valueToCheck === processInteractionEntries;
}

module.exports = isProcessInteractionEntriesReference;