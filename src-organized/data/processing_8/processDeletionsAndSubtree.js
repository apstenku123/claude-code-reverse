/**
 * Processes deletion effects for a given fiber node and its subtree.
 *
 * This function iterates over the deletions array in the provided fiber node (currentFiber),
 * handling each deletion by traversing up the fiber tree to find the appropriate host parent,
 * performing the deletion effect, and cleaning up references. It also recursively processes
 * the subtree if certain flags are set.
 *
 * @param {object} rootNode - The root node or context for the operation (often the root fiber or renderer context).
 * @param {object} currentFiber - The fiber node whose deletions and subtree are to be processed.
 * @returns {void}
 */
function processDeletionsAndSubtree(rootNode, currentFiber) {
  const deletions = currentFiber.deletions;
  // Process each node marked for deletion
  if (deletions !== null) {
    for (let deletionIndex = 0; deletionIndex < deletions.length; deletionIndex++) {
      const fiberToDelete = deletions[deletionIndex];
      try {
        // Save references for traversal
        let hostParent = null;
        let isContainer = false;
        // If the global 'processSubLanguageHighlighting' flag is set, find the nearest host parent
        if (processSubLanguageHighlighting) {
          let parentFiber = currentFiber;
          // Traverse up the fiber tree to find a host parent (tag 5, 3, or 4)
          parentSearch: while (parentFiber !== null) {
            switch (parentFiber.tag) {
              case 5: // HostComponent
                hostParent = parentFiber.stateNode;
                isContainer = false;
                break parentSearch;
              case 3: // HostRoot
              case 4: // HostPortal
                hostParent = parentFiber.stateNode.containerInfo;
                isContainer = true;
                break parentSearch;
            }
            parentFiber = parentFiber.return;
          }
          if (hostParent === null) {
            throw Error(extractNestedPropertyOrArray(160));
          }
          unmountFiberNode(rootNode, currentFiber, fiberToDelete);
          // Reset host parent references after deletion
          hostParent = null;
          isContainer = false;
        } else {
          // If 'processSubLanguageHighlighting' is not set, just perform the deletion effect
          unmountFiberNode(rootNode, currentFiber, fiberToDelete);
        }
        // Clean up alternate and return references to help GC
        const alternateFiber = fiberToDelete.alternate;
        if (alternateFiber !== null) {
          alternateFiber.return = null;
        }
        fiberToDelete.return = null;
      } catch (deletionError) {
        // Handle errors during deletion
        processDeletionsAndSubtree(fiberToDelete, currentFiber, deletionError);
      }
    }
  }
  // Recursively process the subtree if the appropriate flags are set
  if ((currentFiber.subtreeFlags & 12854) !== 0) {
    let childFiber = currentFiber.child;
    while (childFiber !== null) {
      finalizeFiberNode(childFiber, rootNode);
      childFiber = childFiber.sibling;
    }
  }
}

module.exports = processDeletionsAndSubtree;