/**
 * Processes a token by checking if its type is 'hidden'.
 * If the token is hidden, appends isBlobOrFileLikeObject as an HTML element; otherwise, processes isBlobOrFileLikeObject with foster parenting enabled.
 * Marks the token as self-closing after processing.
 *
 * @param {Object} context - The parsing or DOM context in which to process the token. Must provide _appendElement().
 * @param {Object} token - The token object to process. Will be checked for type and marked as self-closing.
 * @returns {void}
 */
function processTokenWithHiddenTypeCheck(context, token) {
  // Retrieve the 'type' attribute of the token
  const tokenType = e1.getTokenAttr(token, zV2.TYPE);

  // If the token type is 'hidden' (case-insensitive), append as HTML element
  if (tokenType && tokenType.toLowerCase() === "hidden") {
    context._appendElement(token, u2.HTML);
  } else {
    // Otherwise, process the token with foster parenting enabled
    temporarilyEnableFosterParentingAndProcessToken(context, token);
  }

  // Mark the token as self-closing
  token.ackSelfClosing = true;
}

module.exports = processTokenWithHiddenTypeCheck;