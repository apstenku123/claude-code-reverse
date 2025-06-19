/**
 * Resets the interaction state by clearing messages, caches, and read file state.
 * Also triggers necessary side effects to ensure a clean state for further interactions.
 *
 * @async
 * @param {Object} params - The parameters object.
 * @param {Function} params.setMessages - Function to update the messages state (typically sets messages to an empty array).
 * @param {Object} params.readFileState - Object representing the current state of read files, which will be cleared.
 * @returns {Promise<void>} Resolves when the reset process is complete.
 */
async function resetInteractionState({
  setMessages,
  readFileState
}) {
  // Await any pre-reset asynchronous operations
  await clearConsoleScreen();

  // Clear all messages
  setMessages([]);

  // Clear caches if the clear method exists
  if (UW.cache.clear) {
    UW.cache.clear();
  }
  if (uD.cache.clear) {
    uD.cache.clear();
  }

  // Perform additional cleanup or state reset
  setShellCurrentWorkingDirectory(C4());

  // Remove all keys from the readFileState object
  Object.keys(readFileState).forEach((key) => {
    delete readFileState[key];
  });

  // Trigger any post-reset operations
  K0A();
}

module.exports = resetInteractionState;