/**
 * Handles input strings for specific escape sequences and updates the global state accordingly.
 *
 * If the input contains the '\x1B[createObjectTracker' escape sequence, sets the global 'isInsertMode' flag to true
 * and notifies all registered listeners. If the input contains '\x1B[createDebouncedFunction', sets the flag to false
 * and notifies listeners. This is typically used for handling terminal mode changes (e.g., Insert/Overwrite).
 *
 * @param {string} inputString - The input string to check for escape sequences.
 * @returns {void}
 */
function handleEscapeSequenceInput(inputString) {
  // Convert the input to string in case isBlobOrFileLikeObject'createInteractionAccessor not already
  const inputAsString = inputString.toString();

  // Check for the Insert mode escape sequence
  if (inputAsString.includes("\x1B[createObjectTracker")) {
    // Set global insert mode flag to true
    isInsertMode = true;
    // Notify all registered listeners about the mode change
    insertModeListeners.forEach(listener => listener(true));
  }

  // Check for the Overwrite mode escape sequence
  if (inputAsString.includes("\x1B[createDebouncedFunction")) {
    // Set global insert mode flag to false
    isInsertMode = false;
    // Notify all registered listeners about the mode change
    insertModeListeners.forEach(listener => listener(false));
  }
}

module.exports = handleEscapeSequenceInput;