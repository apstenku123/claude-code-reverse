/**
 * Checks if all snapshot values in the subtree of the given fiber node are up to date.
 * Traverses the fiber tree starting from the provided root node, and for each node with the 'store' flag,
 * verifies that the current snapshot matches the stored value using the LB comparator.
 * If any snapshot is out of date or throws, returns false. Otherwise, returns true.
 *
 * @param {Object} rootFiberNode - The root fiber node to start traversal from.
 * @returns {boolean} True if all snapshots are up to date, false otherwise.
 */
function areAllSnapshotsUpToDateInSubtree(rootFiberNode) {
  let currentNode = rootFiberNode;
  while (true) {
    // Check if this node has the 'store' flag (16384)
    if (currentNode.flags & 16384) {
      const updateQueue = currentNode.updateQueue;
      if (updateQueue !== null && updateQueue.stores !== null) {
        const stores = updateQueue.stores;
        for (let storeIndex = 0; storeIndex < stores.length; storeIndex++) {
          const store = stores[storeIndex];
          const getSnapshot = store.getSnapshot;
          const lastValue = store.value;
          try {
            // If the snapshot has changed, return false
            if (!LB(getSnapshot(), lastValue)) {
              return false;
            }
          } catch (error) {
            // If getting the snapshot throws, treat as out of date
            return false;
          }
        }
      }
    }
    // Traverse into child if subtree has the 'store' flag
    const childNode = currentNode.child;
    if ((currentNode.subtreeFlags & 16384) && childNode !== null) {
      childNode.return = currentNode;
      currentNode = childNode;
    } else {
      // If at the root node, break
      if (currentNode === rootFiberNode) {
        break;
      }
      // Otherwise, traverse siblings or back up the tree
      while (currentNode.sibling === null) {
        if (currentNode.return === null || currentNode.return === rootFiberNode) {
          return true;
        }
        currentNode = currentNode.return;
      }
      currentNode.sibling.return = currentNode.return;
      currentNode = currentNode.sibling;
    }
  }
  return true;
}

module.exports = areAllSnapshotsUpToDateInSubtree;