/**
 * Inserts a message chain derived from the provided observable into the message chain manager.
 *
 * @param {any} sourceObservable - The observable or data source from which to derive the message chain.
 * @returns {void} This function does not return a value.
 */
function setMessageChainFromObservable(sourceObservable) {
  // Transform the source observable into a message chain object
  const messageChain = bB0(sourceObservable);

  // Insert the message chain into the message chain manager with the 'isActive' flag set to true
  VL().insertMessageChain(messageChain, true);
}

module.exports = setMessageChainFromObservable;