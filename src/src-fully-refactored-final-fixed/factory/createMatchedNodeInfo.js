/**
 * Creates an object containing information about the currently matched node in a traversal.
 *
 * This function checks the current match and traversal node, walks up the tree to find the nearest node
 * that is not filtered out by the provided filter function, and returns an object with the node'createInteractionAccessor id and
 * whether the match is a full match.
 *
 * @returns {{ id: string, isFullMatch: boolean } | null} An object with the matched node'createInteractionAccessor id and match status, or null if no match is found.
 */
function createMatchedNodeInfo() {
  // Check if the match history is null
  if (compileTemplate === null) return null;
  // Check if the current traversal node is null
  if (dC === null) return null;

  let currentNode = dC;
  // Traverse up the tree until a node that is not filtered out is found
  while (currentNode !== null && shouldProcessNode(currentNode)) {
    currentNode = currentNode.return;
  }
  // If no valid node is found, return null
  if (currentNode === null) return null;

  return {
    id: evaluateOrFallback(currentNode), // Get the unique id of the matched node
    isFullMatch: mT === compileTemplate.length - 1 // Check if the match is a full match
  };
}

module.exports = createMatchedNodeInfo;