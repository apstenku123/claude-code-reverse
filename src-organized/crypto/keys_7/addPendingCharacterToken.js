/**
 * Adds a character token to the pendingCharacterTokens array of the given token manager object.
 *
 * @param {Object} tokenManager - The object that manages character tokens and contains the pendingCharacterTokens array.
 * @param {*} characterToken - The character token to add to the pendingCharacterTokens array.
 * @returns {void}
 */
function addPendingCharacterToken(tokenManager, characterToken) {
  // Push the new character token onto the pendingCharacterTokens array
  tokenManager.pendingCharacterTokens.push(characterToken);
}

module.exports = addPendingCharacterToken;