/**
 * Adds a character token to the pendingCharacterTokens array and marks that a non-whitespace character token is pending.
 *
 * @param {Object} tokenProcessor - The object responsible for processing character tokens. Must have a 'pendingCharacterTokens' array and a 'hasNonWhitespacePendingCharacterToken' boolean property.
 * @param {any} characterToken - The character token to add to the pending queue.
 * @returns {void}
 */
function addPendingCharacterToken(tokenProcessor, characterToken) {
  // Add the character token to the pending tokens array
  tokenProcessor.pendingCharacterTokens.push(characterToken);
  // Mark that there is at least one non-whitespace pending character token
  tokenProcessor.hasNonWhitespacePendingCharacterToken = true;
}

module.exports = addPendingCharacterToken;