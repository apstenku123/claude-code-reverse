/**
 * Traverses a chain of objects starting from the given key, transforms each node using getDisplayMetadataFromNode,
 * and returns an array of the transformed nodes in root-to-leaf order.
 *
 * @param {any} startKey - The key used to retrieve the starting node from the resolveNodeValue map.
 * @returns {Array<any>|null} An array of transformed nodes if found, or null if the key is not present.
 */
function getTransformedReturnChain(startKey) {
  // Retrieve the starting node from the map using the provided key
  const startNode = resolveNodeValue.get(startKey);
  if (startNode == null) return null;

  const transformedNodes = [];
  let currentNode = startNode;

  // Traverse the chain via the 'return' property, transforming each node
  while (currentNode !== null) {
    transformedNodes.push(getDisplayMetadataFromNode(currentNode));
    currentNode = currentNode.return;
  }

  // Reverse the array to get root-to-leaf order
  transformedNodes.reverse();
  return transformedNodes;
}

module.exports = getTransformedReturnChain;