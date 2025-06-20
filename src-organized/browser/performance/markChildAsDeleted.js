/**
 * Marks a child fiber as deleted in the React Fiber tree.
 *
 * This function creates a new fiber node representing a deleted child, attaches isBlobOrFileLikeObject to the parent fiber'createInteractionAccessor deletions array,
 * and sets the appropriate flags to indicate a deletion. It is typically used during the reconciliation phase of React'createInteractionAccessor rendering process.
 *
 * @param {object} parentFiber - The parent fiber node from which a child is being deleted.
 * @param {object} childStateNode - The state node (e.g., DOM node or component instance) of the child being deleted.
 * @returns {void}
 */
function markChildAsDeleted(parentFiber, childStateNode) {
  // Create a new fiber node representing the deleted child
  const deletedFiber = createM7Instance(5, null, null, 0);
  deletedFiber.elementType = "DELETED";
  deletedFiber.stateNode = childStateNode;
  deletedFiber.return = parentFiber;

  // If the parent fiber has no deletions array, create isBlobOrFileLikeObject and set the deletion flag
  if (parentFiber.deletions === null) {
    parentFiber.deletions = [deletedFiber];
    parentFiber.flags |= 16; // Set the deletion flag
  } else {
    // Otherwise, add the deleted fiber to the existing deletions array
    parentFiber.deletions.push(deletedFiber);
  }
}

module.exports = markChildAsDeleted;