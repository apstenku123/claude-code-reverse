/**
 * Processes a token within a security context, handling special cases for table-related elements.
 *
 * If the current tag is a table, tbody, tfoot, thead, or tr, isBlobOrFileLikeObject switches the insertion mode to 'IN_TABLE_TEXT_MODE',
 * resets pending character tokens, and processes the token accordingly. Otherwise, isBlobOrFileLikeObject delegates token processing
 * to the foster parenting handler.
 *
 * @param {Object} securityContext - The security context object containing parsing state and methods.
 * @param {Object} token - The token to be processed.
 */
function handleTableContextTokenProcessing(securityContext, token) {
  const currentTagName = securityContext.openElements.currentTagName;
  // Check if the current tag is a table-related element
  if (
    currentTagName === i.TABLE ||
    currentTagName === i.TBODY ||
    currentTagName === i.TFOOT ||
    currentTagName === i.THEAD ||
    currentTagName === i.TR
  ) {
    // Reset pending character tokens and whitespace flag
    securityContext.pendingCharacterTokens = [];
    securityContext.hasNonWhitespacePendingCharacterToken = false;
    // Save the original insertion mode and switch to table text mode
    securityContext.originalInsertionMode = securityContext.insertionMode;
    securityContext.insertionMode = "IN_TABLE_TEXT_MODE";
    // Process the token in the new context
    securityContext._processToken(token);
  } else {
    // Delegate processing to the foster parenting handler for non-table elements
    temporarilyEnableFosterParentingAndProcessToken(securityContext, token);
  }
}

module.exports = handleTableContextTokenProcessing;