/**
 * Processes a token within the context of an HTML table-related element.
 * If the current tag is a table, tbody, tfoot, thead, or tr, the function switches the insertion mode to 'IN_TABLE_TEXT_MODE',
 * resets pending character tokens, and processes the token accordingly. Otherwise, isBlobOrFileLikeObject delegates token processing to
 * temporarilyEnableFosterParentingAndProcessToken.
 *
 * @param {Object} parserContext - The current parser context, including open elements and insertion mode state.
 * @param {Object} token - The token to process.
 * @returns {void}
 */
function handleTableContextToken(parserContext, token) {
  // Get the tag name of the current element being processed
  const currentTagName = parserContext.openElements.currentTagName;

  // List of table-related tag names that require special handling
  const TABLE_TAGS = [
    i.TABLE,
    i.TBODY,
    i.TFOOT,
    i.THEAD,
    i.TR
  ];

  // If the current tag is a table-related tag, enter table text mode
  if (TABLE_TAGS.includes(currentTagName)) {
    // Reset pending character tokens and related state
    parserContext.pendingCharacterTokens = [];
    parserContext.hasNonWhitespacePendingCharacterToken = false;
    // Save the original insertion mode
    parserContext.originalInsertionMode = parserContext.insertionMode;
    // Switch to 'IN_TABLE_TEXT_MODE'
    parserContext.insertionMode = "IN_TABLE_TEXT_MODE";
    // Process the token in the new mode
    parserContext._processToken(token);
  } else {
    // Otherwise, process the token with foster parenting temporarily enabled
    temporarilyEnableFosterParentingAndProcessToken(parserContext, token);
  }
}

module.exports = handleTableContextToken;