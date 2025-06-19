/**
 * Resets the application'createInteractionAccessor messages and clears the read file state.
 *
 * This function performs several cleanup operations:
 *   1. Awaits completion of any pending message-related tasks.
 *   2. Clears the messages array.
 *   3. Clears caches for UW and uD modules if available.
 *   4. Calls setShellCurrentWorkingDirectory with the result of C4 (purpose: likely to update some state or cache).
 *   5. Removes all keys from the readFileState object.
 *   6. Calls K0A to finalize the reset process.
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.setMessages - Function to update the messages array (typically a state setter).
 * @param {Object} params.readFileState - Object representing the current state of read files to be cleared.
 * @returns {Promise<void>} Resolves when the reset process is complete.
 */
async function resetMessagesAndReadFileState({
  setMessages,
  readFileState
}) {
  // Wait for any pending message-related operations to complete
  await clearConsoleScreen();

  // Clear the messages array
  setMessages([]);

  // Clear caches for UW and uD modules if the clear method exists
  UW.cache.clear?.();
  uD.cache.clear?.();

  // Update state/cache by calling setShellCurrentWorkingDirectory with the result of C4
  setShellCurrentWorkingDirectory(C4());

  // Remove all properties from the readFileState object
  Object.keys(readFileState).forEach((key) => {
    delete readFileState[key];
  });

  // Finalize the reset process
  K0A();
}

module.exports = resetMessagesAndReadFileState;