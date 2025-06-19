/**
 * Compares the memoized state of two nodes associated with the given key.
 *
 * This function retrieves two node states (previous and current) for a given key from a global map and compares their memoized values
 * according to the node type. It supports different comparison strategies based on the node type (e.g., element, component, etc.).
 *
 * @param {any} nodeKey - The key or node identifier to compare states for.
 * @returns {boolean|null} Returns true if the memoized states differ, false if they are the same, or null if comparison is not possible.
 */
function compareMemoizedNodeStates(nodeKey) {
  // Ensure the global node state map exists
  if (iE !== null) {
    // Retrieve the unique key for the node
    const uniqueNodeKey = evaluateOrFallback(nodeKey);
    // Get the previous node state from the map, or null if not present
    const previousNodeState = iE.has(uniqueNodeKey) ? iE.get(uniqueNodeKey) : null;
    // Get the current node state
    const currentNodeState = extractContextFromNode(nodeKey);

    // If either state is missing, cannot compare
    if (previousNodeState == null || currentNodeState == null) return null;

    // Destructure previous and current node state arrays
    const [previousMemoizedValue, previousLinkedList] = getReactContextFromFiberNode(previousNodeState, 2);
    const [currentMemoizedValue, currentLinkedList] = getReactContextFromFiberNode(currentNodeState, 2);

    // Determine the node type for comparison logic
    switch (getProcessingHandlerByTagOrType(nodeKey)) {
      case d6: // Element node type
        if (previousNodeState && currentNodeState) {
          // If the current memoized value is not the placeholder, compare directly
          if (currentMemoizedValue !== pE) {
            return tk(previousMemoizedValue, currentMemoizedValue);
          } else if (currentLinkedList !== pE) {
            // If the linked list is not the placeholder, compare linked list references
            return previousLinkedList !== currentLinkedList;
          }
        }
        break;
      case handleElementProcessing: // Component node type
      case processHtmlElement: // Context node type
      case updateBitwiseStateAndEncode: // Fragment node type
        if (currentLinkedList !== pE) {
          let previousListNode = previousLinkedList;
          let currentListNode = currentLinkedList;
          // Traverse both linked lists and compare memoized values
          while (previousListNode && currentListNode) {
            if (!isValidAndTypeMatch(previousListNode.memoizedValue, currentListNode.memoizedValue)) {
              return true;
            }
            previousListNode = previousListNode.next;
            currentListNode = currentListNode.next;
          }
          // If all memoized values are equal, return false
          return false;
        }
        break;
      default:
        // For other node types, do nothing
        break;
    }
  }
  // If the global node state map is missing or comparison is not possible
  return null;
}

module.exports = compareMemoizedNodeStates;