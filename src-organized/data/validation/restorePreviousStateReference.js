/**
 * Restores the previous state reference from the stateStack to the provided stateHolder object.
 *
 * @param {Object} stateHolder - An object with a 'current' property that will receive the restored state reference.
 * @returns {void}
 *
 * If the stateStackIndex is valid (>= 0), assigns the value at stateStack[stateStackIndex] to stateHolder.current,
 * then clears that slot in the stack and decrements the index.
 */
function restorePreviousStateReference(stateHolder) {
  // Ensure the stateStackIndex is valid before restoring
  if (stateStackIndex >= 0) {
    // Restore the previous state reference
    stateHolder.current = stateStack[stateStackIndex];
    // Clear the slot in the stack to avoid memory leaks
    stateStack[stateStackIndex] = null;
    // Move the stack pointer back
    stateStackIndex--;
  }
}

module.exports = restorePreviousStateReference;