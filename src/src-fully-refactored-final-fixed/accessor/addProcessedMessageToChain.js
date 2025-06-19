/**
 * Adds a processed message to the message chain using the provided source observable.
 *
 * @param {any} sourceObservable - The observable or message source to process and insert into the chain.
 * @returns {void}
 */
function addProcessedMessageToChain(sourceObservable) {
  // Process the source observable to obtain the message chain entry
  const processedMessage = bB0(sourceObservable);

  // Insert the processed message into the message chain with the 'isImmediate' flag set to true
  VL().insertMessageChain(processedMessage, true);
}

module.exports = addProcessedMessageToChain;