/**
 * Iterates through two parallel linked lists of state nodes and collects the indices where a matching condition is met.
 *
 * This function is typically used to compare two linked lists (such as React hook state chains) and identify the positions where a custom comparison function returns true.
 *
 * @param {Object} sourceStateNode - The head node of the first linked list (e.g., current state chain).
 * @param {Object} targetStateNode - The head node of the second linked list (e.g., previous state chain).
 * @returns {number[]|null} An array of indices where the comparison function returns true, or null if either input is null.
 */
function findMatchingStateIndicesInLinkedList(sourceStateNode, targetStateNode) {
  // Return null if either input is null or undefined
  if (sourceStateNode == null || targetStateNode == null) {
    return null;
  }

  const matchingIndices = [];
  let currentIndex = 0;

  // Check if targetStateNode has the required properties to be considered a valid state node
  const hasRequiredProperties =
    targetStateNode.hasOwnProperty("baseState") &&
    targetStateNode.hasOwnProperty("memoizedState") &&
    targetStateNode.hasOwnProperty("next") &&
    targetStateNode.hasOwnProperty("queue");

  // Only iterate if the target node is a valid state node
  if (hasRequiredProperties) {
    // Traverse both linked lists in parallel
    while (targetStateNode !== null) {
      // Use the external hasMemoizedStateChanged comparison function to check for a match at this index
      if (hasMemoizedStateChanged(sourceStateNode, targetStateNode)) {
        matchingIndices.push(currentIndex);
      }
      // Move to the next nodes in both lists
      targetStateNode = targetStateNode.next;
      sourceStateNode = sourceStateNode.next;
      currentIndex++;
    }
  }

  return matchingIndices;
}

module.exports = findMatchingStateIndicesInLinkedList;