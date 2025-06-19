/**
 * Retrieves the instance (stateNode) and style object from a given node.
 *
 * This function takes an input node, attempts to extract its internal representation
 * using the external `findMountedFiberById` function, and then returns an object containing the instance
 * (stateNode) and its associated style (if available).
 *
 * @param {any} node - The input node from which to extract the instance and style.
 * @returns {{ instance: any, style: any }} An object containing the instance (stateNode) and style object, or null values if not found.
 */
function getInstanceAndStyleFromNode(node) {
  // Attempt to get the internal representation of the node
  const internalNode = findMountedFiberById(node);
  let instance = null;
  let style = null;

  if (internalNode !== null) {
    // Extract the instance (stateNode)
    instance = internalNode.stateNode;
    // If memoizedProps exist, extract the style property
    if (internalNode.memoizedProps !== null) {
      style = internalNode.memoizedProps.style;
    }
  }

  return {
    instance,
    style
  };
}

module.exports = getInstanceAndStyleFromNode;