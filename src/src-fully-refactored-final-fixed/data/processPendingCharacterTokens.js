/**
 * Processes all pending character tokens in the given context, using either foster parenting or direct insertion as appropriate,
 * then restores the original insertion mode and processes the provided token.
 *
 * @param {Object} context - The parsing context containing pending character tokens and insertion mode state.
 * @param {Object} token - The token to process after pending characters are handled.
 * @returns {void}
 */
function processPendingCharacterTokens(context, token) {
  // Process each pending character token
  if (context.hasNonWhitespacePendingCharacterToken) {
    // If there are non-whitespace pending character tokens, process each with foster parenting enabled
    for (let i = 0; i < context.pendingCharacterTokens.length; i++) {
      // temporarilyEnableFosterParentingAndProcessToken: temporarilyEnableFosterParentingAndProcessToken
      temporarilyEnableFosterParentingAndProcessToken(context, context.pendingCharacterTokens[i]);
    }
  } else {
    // Otherwise, insert each pending character token directly
    for (let i = 0; i < context.pendingCharacterTokens.length; i++) {
      context._insertCharacters(context.pendingCharacterTokens[i]);
    }
  }

  // Restore the original insertion mode
  context.insertionMode = context.originalInsertionMode;
  // Process the provided token
  context._processToken(token);
}

module.exports = processPendingCharacterTokens;