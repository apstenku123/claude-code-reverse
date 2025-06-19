/**
 * Saves the current parser state to a stack and updates the state variables.
 *
 * This function is typically used in a parser context where the current state
 * (such as the current character code and accumulator) needs to be saved before
 * switching to a new state. The previous states are pushed onto a stack for later restoration.
 *
 * @param {number} newCharCode - The new character code to set as the current state.
 * @param {number} newAccumulator - The new accumulator value to set as the current state.
 * @returns {void}
 */
function saveAndSwapParserState(newCharCode, newAccumulator) {
  // Save the current parser state (currentCharCode and currentAccumulator) onto the stack
  parserStateStack[parserStateStackPointer++] = currentCharCode;
  parserStateStack[parserStateStackPointer++] = currentAccumulator;

  // Update the current state with the new values
  currentAccumulator = newCharCode;
  currentCharCode = newAccumulator;
}

module.exports = saveAndSwapParserState;