/**
 * Saves the current context values and swaps in new ones.
 *
 * This function pushes the current values of `currentContext` and `currentUserContext`
 * onto the `contextStack` array, then updates `currentUserContext` and `currentContext`
 * with the provided new values. This is typically used to manage context switching
 * in a stack-like fashion, such as when entering or exiting a new execution context.
 *
 * @param {any} newUserContext - The new value to set for the user context.
 * @param {any} newContext - The new value to set for the general context.
 * @returns {void}
 */
function saveAndSwapContext(newUserContext, newContext) {
  // Save the current context and user context onto the stack
  contextStack[contextStackPointer++] = currentContext;
  contextStack[contextStackPointer++] = currentUserContext;

  // Swap in the new context values
  currentUserContext = newUserContext;
  currentContext = newContext;
}

module.exports = saveAndSwapContext;