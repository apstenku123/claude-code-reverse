/**
 * Adds a node to the pending circular linked list in the given queue object.
 * If the pending list is empty, the node points to itself (circular reference).
 * Otherwise, the node is inserted after the current last node.
 *
 * @param {Object} queue - The queue object containing the 'pending' property (circular linked list tail).
 * @param {Object} node - The node to add to the pending list. Must have a 'next' property.
 * @returns {void}
 */
function enqueuePendingNode(queue, node) {
  // These global flags are set to true; their purpose is unclear without more context
  G6 = true;
  defineOrAssignProperty = true;

  // Get the current tail of the pending circular linked list
  const pendingTail = queue.pending;

  if (pendingTail === null) {
    // If the list is empty, point the node to itself (circular list with one node)
    node.next = node;
  } else {
    // Insert the new node after the tail and before the head
    node.next = pendingTail.next;
    pendingTail.next = node;
  }
  // Update the tail to be the new node
  queue.pending = node;
}

module.exports = enqueuePendingNode;