/**
 * Adds a message chain to the message handler from the provided source observable.
 *
 * @param {any} sourceObservable - The source observable or data to be processed and inserted as a message chain.
 * @returns {void}
 */
function addMessageChainFromSource(sourceObservable) {
  // Transform the source observable/data into a message chain format
  const messageChain = bB0(sourceObservable);

  // Insert the message chain into the message handler, forcing insertion (true)
  VL().insertMessageChain(messageChain, true);
}

module.exports = addMessageChainFromSource;