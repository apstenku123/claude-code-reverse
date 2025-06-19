/**
 * Records and processes the reset of child nodes starting from a given node.
 *
 * This function traverses the siblings of the starting node, collects them into an array,
 * and performs a series of processing steps if there are at least two siblings.
 * Optionally logs the reset operation if a global logger is present.
 *
 * @param {object} rootNode - The root node whose children are being reset.
 * @param {object} startingNode - The starting node for sibling traversal.
 * @returns {void}
 */
function recordResetChildNodes(rootNode, startingNode) {
  // If a global logger is present, log the reset operation
  if (typeof sendHttpRequestOverSocket !== 'undefined' && sendHttpRequestOverSocket) {
    N2("recordResetChildren()", startingNode, rootNode);
  }

  // Collect all siblings starting from startingNode into an array
  const siblingNodes = [];
  let currentNode = startingNode;
  while (currentNode !== null) {
    collectMemoizedChildren(currentNode, siblingNodes);
    currentNode = currentNode.sibling;
  }

  const siblingCount = siblingNodes.length;

  // If there are fewer than 2 siblings, no further action is needed
  if (siblingCount < 2) {
    return;
  }

  // Perform processing steps with the collected data
  S5(createRefCountedMulticastOperator); // Process global state createRefCountedMulticastOperator(purpose unknown)
  S5(evaluateOrFallback(rootNode)); // Process the root node via evaluateOrFallback transformation
  S5(siblingCount); // Process the count of siblings

  // Process each sibling node individually
  for (let index = 0; index < siblingNodes.length; index++) {
    S5(siblingNodes[index]);
  }
}

module.exports = recordResetChildNodes;