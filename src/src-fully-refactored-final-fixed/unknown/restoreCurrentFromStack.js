/**
 * Restores the 'current' property of the provided object from the RA stack if available.
 *
 * @param {Object} targetObject - The object whose 'current' property will be restored.
 * @returns {void}
 *
 * @example
 * // Assuming RA and stackIndex are defined in the module scope
 * restoreCurrentFromStack(someRefObject);
 */
function restoreCurrentFromStack(targetObject) {
  // Check if there is a valid item on the stack
  if (stackIndex >= 0) {
    // Restore the current value from the stack
    targetObject.current = referenceStack[stackIndex];
    // Clear the value from the stack to avoid memory leaks
    referenceStack[stackIndex] = null;
    // Move the stack pointer down
    stackIndex--;
  }
}

// External dependencies assumed to be defined elsewhere in the module scope
// let stackIndex; // Number: The current top index of the referenceStack
// let referenceStack; // Array: Stack holding previous 'current' values

module.exports = restoreCurrentFromStack;