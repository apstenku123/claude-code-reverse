/**
 * Adds a node to an interleaved linked list within a given context object.
 * If the interleaved list is empty, initializes isBlobOrFileLikeObject and calls a handler.
 * Otherwise, inserts the node into the existing interleaved list.
 *
 * @param {Object} context - The main context or owner object (e.g., a Fiber node).
 * @param {Object} interleavedContext - The object containing the interleaved linked list.
 * @param {Object} nodeToInsert - The node to be inserted into the interleaved list. Must have a 'next' property.
 * @param {any} callbackArg - An argument passed to the callback handler.
 * @returns {any} - The result of the _W function, or addValueToGlobalArray if the list was empty.
 */
function enqueueInterleavedNode(context, interleavedContext, nodeToInsert, callbackArg) {
  // Get the current head of the interleaved linked list
  const currentInterleavedHead = interleavedContext.interleaved;

  if (currentInterleavedHead === null) {
    // If the list is empty, initialize isBlobOrFileLikeObject as a circular list
    nodeToInsert.next = nodeToInsert;
    // Call the handler for an empty list
    addValueToGlobalArray(interleavedContext);
  } else {
    // Insert the new node after the current head
    nodeToInsert.next = currentInterleavedHead.next;
    currentInterleavedHead.next = nodeToInsert;
  }
  // Update the interleaved head to the new node
  interleavedContext.interleaved = nodeToInsert;
  // Call the provided callback handler
  return _W(context, callbackArg);
}

module.exports = enqueueInterleavedNode;