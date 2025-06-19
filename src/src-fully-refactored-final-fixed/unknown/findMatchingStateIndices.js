/**
 * Iterates through two linked state objects in parallel and returns the indices where their states match a specific condition.
 *
 * @param {Object} firstStateNode - The head node of the first linked state list.
 * @param {Object} secondStateNode - The head node of the second linked state list. Must have 'baseState', 'memoizedState', 'next', and 'queue' properties.
 * @returns {number[]|null} An array of indices where the states match the condition defined by 'hasMemoizedStateChanged', or null if either parameter is null.
 */
function findMatchingStateIndices(firstStateNode, secondStateNode) {
  if (firstStateNode == null || secondStateNode == null) {
    return null;
  }

  const matchingIndices = [];
  let currentIndex = 0;

  // Ensure the secondStateNode has the required properties before traversing
  const hasRequiredProperties =
    secondStateNode.hasOwnProperty("baseState") &&
    secondStateNode.hasOwnProperty("memoizedState") &&
    secondStateNode.hasOwnProperty("next") &&
    secondStateNode.hasOwnProperty("queue");

  if (hasRequiredProperties) {
    // Traverse both linked lists in parallel
    while (secondStateNode !== null) {
      // If the custom condition is met, record the current index
      if (hasMemoizedStateChanged(firstStateNode, secondStateNode)) {
        matchingIndices.push(currentIndex);
      }
      // Move to the next nodes in both lists
      secondStateNode = secondStateNode.next;
      firstStateNode = firstStateNode.next;
      currentIndex++;
    }
  }

  return matchingIndices;
}

module.exports = findMatchingStateIndices;