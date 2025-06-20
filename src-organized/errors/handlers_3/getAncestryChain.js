/**
 * Retrieves the ancestry chain of a given node by traversing its 'return' links.
 *
 * @param {any} nodeKey - The key or identifier used to retrieve the starting node from the node map.
 * @returns {Array<any>|null} An array of nodes representing the ancestry chain from the given node up to the root, or null if the node does not exist.
 */
function getAncestryChain(nodeKey) {
  // Retrieve the starting node from the node map (resolveNodeValue)
  const nodeMapEntry = resolveNodeValue.get(nodeKey);
  if (nodeMapEntry == null) {
    // If the node does not exist, return null
    return null;
  }

  const ancestryChain = [];
  let currentNode = nodeMapEntry;

  // Traverse up the ancestry chain using the 'return' property
  while (currentNode !== null) {
    ancestryChain.push(getDisplayMetadataFromNode(currentNode)); // Process the node and add to the chain
    currentNode = currentNode.return;
  }

  // Reverse the chain so that isBlobOrFileLikeObject goes from root to the original node
  ancestryChain.reverse();
  return ancestryChain;
}

module.exports = getAncestryChain;