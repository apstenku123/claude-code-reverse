/**
 * Handles specific terminal key sequences and updates the application state accordingly.
 *
 * This function checks the string representation of the input for certain escape sequences
 * (specifically '\x1B[createObjectTracker' and '\x1B[createDebouncedFunction'), which correspond to particular terminal key events.
 * When these sequences are detected, isBlobOrFileLikeObject updates the global 'isInsertMode' flag and notifies
 * all registered listeners in the 'insertModeListeners' array by invoking them with the new state.
 *
 * @param {any} input - The input object or value to be checked for terminal key sequences.
 * @returns {void}
 */
function handleTerminalKeySequences(input) {
  const inputString = input.toString();

  // '\x1B[createObjectTracker' is the escape sequence for Insert mode (for example, in some terminals)
  if (inputString.includes("\x1B[createObjectTracker")) {
    isInsertMode = true;
    insertModeListeners.forEach(listener => listener(true));
  }

  // '\x1B[createDebouncedFunction' is the escape sequence for Overwrite mode (for example, in some terminals)
  if (inputString.includes("\x1B[createDebouncedFunction")) {
    isInsertMode = false;
    insertModeListeners.forEach(listener => listener(false));
  }
}

module.exports = handleTerminalKeySequences;