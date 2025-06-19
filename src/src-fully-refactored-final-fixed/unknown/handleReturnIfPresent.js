/**
 * Checks if the 'return' property of the context object is not null and, if so,
 * performs cleanup or finalization by calling the provided external functions.
 *
 * @param {Object} context - The context object, expected to have a 'return' property.
 * @returns {void}
 */
function handleReturnIfPresent(context) {
  // If the 'return' property is not null, perform cleanup/finalization
  if (context.return !== null) {
    saveAndSwapContext(context, 1); // External function, possibly for cleanup
    updateBitwiseStateAndEncode(context, 1, 0); // External function, possibly for state update
  }
}

module.exports = handleReturnIfPresent;