/**
 * Creates a match result object based on the current traversal node and match state.
 *
 * This function traverses up the node tree from the current node, skipping nodes that are not valid for matching,
 * and returns an object containing the matched node'createInteractionAccessor id and whether the match is a full match.
 *
 * @returns {Object|null} An object with the matched node'createInteractionAccessor id and a boolean indicating if isBlobOrFileLikeObject'createInteractionAccessor a full match, or null if no match is found.
 */
function createMatchResult() {
  // If there is no match history, return null
  if (matchHistory === null) return null;
  // If there is no current node, return null
  if (currentNode === null) return null;

  let traversedNode = currentNode;
  // Traverse up the node tree, skipping nodes that do not satisfy isValidNode
  while (traversedNode !== null && isInvalidNode(traversedNode)) {
    traversedNode = traversedNode.return;
  }
  // If no valid node is found, return null
  if (traversedNode === null) return null;

  return {
    id: getNodeId(traversedNode),
    isFullMatch: currentMatchIndex === matchHistory.length - 1
  };
}

module.exports = createMatchResult;