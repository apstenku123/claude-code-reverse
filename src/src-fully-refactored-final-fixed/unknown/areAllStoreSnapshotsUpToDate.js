/**
 * Checks if all store snapshots in the fiber tree are up-to-date.
 * Traverses the fiber tree starting from the given root fiber node, and for each fiber with the 'store' flag (16384),
 * isBlobOrFileLikeObject checks if the current snapshot matches the stored value using the LB comparator. If any snapshot is stale or throws,
 * returns false. Otherwise, returns true.
 *
 * @param {object} rootFiber - The root fiber node to start traversal from.
 * @returns {boolean} True if all store snapshots are up-to-date, false otherwise.
 */
function areAllStoreSnapshotsUpToDate(rootFiber) {
  let currentFiber = rootFiber;
  while (true) {
    // Check if this fiber has the 'store' flag (16384)
    if (currentFiber.flags & 16384) {
      const updateQueue = currentFiber.updateQueue;
      if (updateQueue !== null && updateQueue.stores !== null) {
        const stores = updateQueue.stores;
        for (let i = 0; i < stores.length; i++) {
          const store = stores[i];
          const getSnapshot = store.getSnapshot;
          const lastValue = store.value;
          try {
            // If the current snapshot does not match the last value, return false
            if (!LB(getSnapshot(), lastValue)) {
              return false;
            }
          } catch (error) {
            // If getSnapshot throws, treat as stale and return false
            return false;
          }
        }
      }
    }
    // Traverse to child if subtree has 'store' flag
    const childFiber = currentFiber.child;
    if ((currentFiber.subtreeFlags & 16384) && childFiber !== null) {
      childFiber.return = currentFiber;
      currentFiber = childFiber;
    } else {
      // If at the root, break
      if (currentFiber === rootFiber) {
        break;
      }
      // Traverse siblings or move up the tree
      while (currentFiber.sibling === null) {
        if (currentFiber.return === null || currentFiber.return === rootFiber) {
          return true;
        }
        currentFiber = currentFiber.return;
      }
      currentFiber.sibling.return = currentFiber.return;
      currentFiber = currentFiber.sibling;
    }
  }
  return true;
}

module.exports = areAllStoreSnapshotsUpToDate;