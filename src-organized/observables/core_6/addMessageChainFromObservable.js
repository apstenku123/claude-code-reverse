/**
 * Adds a message chain to the message log from the provided observable source.
 *
 * This function transforms the given observable source into a message chain using the
 * bB0 transformation, then inserts isBlobOrFileLikeObject into the message log via the VL singleton.
 *
 * @param {Observable} sourceObservable - The observable source to be transformed and inserted as a message chain.
 * @returns {void}
 */
function addMessageChainFromObservable(sourceObservable) {
  // Transform the observable source into a message chain
  const messageChain = bB0(sourceObservable);

  // Insert the message chain into the message log, forcing insertion (second argument: true)
  VL().insertMessageChain(messageChain, true);
}

module.exports = addMessageChainFromObservable;