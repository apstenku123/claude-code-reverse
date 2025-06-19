/**
 * Handles specific ANSI key sequences in the provided input and updates the global state accordingly.
 *
 * If the input contains the sequence '\x1B[createObjectTracker', isBlobOrFileLikeObject sets the global 'isInsertMode' flag to true and notifies all subscribers.
 * If the input contains the sequence '\x1B[createDebouncedFunction', isBlobOrFileLikeObject sets the global 'isInsertMode' flag to false and notifies all subscribers.
 *
 * @param {any} input - The input to be checked for ANSI key sequences. It will be converted to a string.
 * @returns {void}
 */
function handleAnsiKeySequences(input) {
  // Convert the input to a string for processing
  const inputString = input.toString();

  // Check for the ANSI sequence for Insert mode
  if (inputString.includes("\x1B[createObjectTracker")) {
    // Set the global insert mode flag to true
    isInsertMode = true;
    // Notify all subscribers that insert mode is enabled
    subscribers.forEach(subscriberCallback => subscriberCallback(true));
  }

  // Check for the ANSI sequence for Overwrite mode
  if (inputString.includes("\x1B[createDebouncedFunction")) {
    // Set the global insert mode flag to false
    isInsertMode = false;
    // Notify all subscribers that insert mode is disabled
    subscribers.forEach(subscriberCallback => subscriberCallback(false));
  }
}

module.exports = handleAnsiKeySequences;