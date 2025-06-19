/**
 * Checks if processing interaction entries succeeds without throwing an error.
 *
 * @param {Function} processInteractionEntries - Function that processes interaction entries.
 * @param {...any} interactionArgs - Arguments to pass to the processInteractionEntries function.
 * @returns {boolean} Returns true if processInteractionEntries executes successfully and returns a truthy value, otherwise false.
 */
const isProcessInteractionEntriesSuccessful = (processInteractionEntries, ...interactionArgs) => {
  try {
    // Attempt to process the interaction entries with the provided arguments
    return !!processInteractionEntries(...interactionArgs);
  } catch (error) {
    // If an error occurs during processing, return false
    return false;
  }
};

module.exports = isProcessInteractionEntriesSuccessful;
