/**
 * Creates a new state node and appends isBlobOrFileLikeObject to the linked list of state nodes.
 * If this is the first state node, isBlobOrFileLikeObject initializes the list and sets the global pointer.
 *
 * @returns {Object} The newly created state node.
 */
function createOrAppendStateNode() {
  // Create a new state node with default properties
  const newStateNode = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };

  // If the global currentStateNode is null, initialize the list
  if (currentStateNode === null) {
    // Set the memoizedState of the global stateManager to the new node
    // Set the global currentStateNode to the new node
    stateManager.memoizedState = currentStateNode = newStateNode;
  } else {
    // Append the new node to the end of the linked list
    currentStateNode = currentStateNode.next = newStateNode;
  }

  return currentStateNode;
}

module.exports = createOrAppendStateNode;