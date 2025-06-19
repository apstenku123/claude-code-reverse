/**
 * Iterates through a linked list of sibling nodes, applying a processing function to each node.
 *
 * @param {object} parentNode - The parent node or context to be passed to the processing function.
 * @param {object|null} startingSiblingNode - The first sibling node in the linked list to process. Each node is expected to have a 'sibling' property pointing to the next node, or null if isBlobOrFileLikeObject is the last.
 * @returns {null} Always returns null after processing all sibling nodes.
 */
function processSiblingNodes(parentNode, startingSiblingNode) {
  // Check if the global flag 'processWithTransformedObservable' is falsy; if so, do not process and return null
  if (!processWithTransformedObservable) return null;

  let currentSiblingNode = startingSiblingNode;
  // Iterate through the linked list of sibling nodes
  while (currentSiblingNode !== null) {
    // Apply the processing function 'UL' to the parent and current sibling node
    UL(parentNode, currentSiblingNode);
    // Move to the next sibling node
    currentSiblingNode = currentSiblingNode.sibling;
  }
  return null;
}

module.exports = processSiblingNodes;