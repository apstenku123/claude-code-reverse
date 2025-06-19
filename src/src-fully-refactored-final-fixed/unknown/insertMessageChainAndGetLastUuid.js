/**
 * Inserts a message chain derived from the provided observable into the message store,
 * then returns the UUID of the last message in the chain.
 *
 * @param {any} sourceObservable - The observable or source object to process into a message chain.
 * @returns {string|null} The UUID of the last message in the chain, or null if not available.
 */
function insertMessageChainAndGetLastUuid(sourceObservable) {
  // Convert the source observable into a message chain configuration array
  const messageChainConfig = bB0(sourceObservable);

  // Insert the message chain into the message store/system
  VL().insertMessageChain(messageChainConfig);

  // Return the UUID of the last message in the chain, or null if not present
  const lastMessage = messageChainConfig[messageChainConfig.length - 1];
  return lastMessage?.uuid || null;
}

module.exports = insertMessageChainAndGetLastUuid;