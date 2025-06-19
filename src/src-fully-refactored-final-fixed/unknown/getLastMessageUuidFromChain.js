/**
 * Retrieves the UUID of the last message in a message chain derived from the provided source observable.
 *
 * @param {any} sourceObservable - The source observable or data structure to extract the message chain from.
 * @returns {string|null} The UUID of the last message in the chain, or null if not available.
 */
function getLastMessageUuidFromChain(sourceObservable) {
  // Generate the message chain configuration from the source observable
  const messageChain = bB0(sourceObservable);

  // Insert the message chain into the message chain manager (side effect)
  VL().insertMessageChain(messageChain);

  // Return the UUID of the last message in the chain, or null if not present
  return messageChain[messageChain.length - 1]?.uuid || null;
}

module.exports = getLastMessageUuidFromChain;