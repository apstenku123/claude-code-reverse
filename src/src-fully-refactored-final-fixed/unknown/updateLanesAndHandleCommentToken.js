/**
 * Updates the lanes property of the given node if the provided laneMask matches certain bits,
 * then processes the updated lanes using the handleCommentToken function.
 *
 * @param {Object} rootNode - The root node containing pendingLanes.
 * @param {Object} node - The node whose lanes property may be updated.
 * @param {number} laneMask - The bitmask representing the lanes to check and update.
 * @returns {void}
 */
function updateLanesAndHandleCommentToken(rootNode, node, laneMask) {
  // Check if any of the bits in laneMask match the mask 0x3FFFC0 (4194240)
  if ((laneMask & 0x3FFFC0) !== 0) {
    // Extract the lanes from the node
    let nodeLanes = node.lanes;
    // Mask nodeLanes with the rootNode'createInteractionAccessor pendingLanes
    nodeLanes &= rootNode.pendingLanes;
    // Combine the masked lanes with the laneMask
    laneMask |= nodeLanes;
    // Update the node'createInteractionAccessor lanes property
    node.lanes = laneMask;
    // Process the updated lanes using the external handler
    handleCommentToken(rootNode, laneMask);
  }
}

module.exports = updateLanesAndHandleCommentToken;