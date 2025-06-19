/**
 * Processes a token within a security context, handling special table-related tag cases.
 *
 * If the current tag is a table-related tag (TABLE, TBODY, TFOOT, THEAD, TR),
 * the function switches the insertion mode to 'IN_TABLE_TEXT_MODE', clears pending character tokens,
 * and processes the token accordingly. Otherwise, isBlobOrFileLikeObject processes the token with foster parenting enabled.
 *
 * @param {Object} securityContext - The security context object, containing open elements and insertion state.
 * @param {Object} token - The token to process within the context.
 * @returns {void}
 */
function handleTableTextModeOrFosterParenting(securityContext, token) {
  const currentTagName = securityContext.openElements.currentTagName;

  // Check if the current tag is a table-related tag
  if (
    currentTagName === i.TABLE ||
    currentTagName === i.TBODY ||
    currentTagName === i.TFOOT ||
    currentTagName === i.THEAD ||
    currentTagName === i.TR
  ) {
    // Clear pending character tokens and reset whitespace flag
    securityContext.pendingCharacterTokens = [];
    securityContext.hasNonWhitespacePendingCharacterToken = false;
    // Save the original insertion mode
    securityContext.originalInsertionMode = securityContext.insertionMode;
    // Switch to table text mode
    securityContext.insertionMode = "IN_TABLE_TEXT_MODE";
    // Process the token in the new mode
    securityContext._processToken(token);
  } else {
    // Otherwise, process the token with foster parenting enabled
    withFosterParentingEnabled(securityContext, token);
  }
}

module.exports = handleTableTextModeOrFosterParenting;