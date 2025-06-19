/**
 * Checks whether all store snapshots in the subtree rooted at the given fiber node are up-to-date.
 * Traverses the fiber tree in a depth-first manner, looking for fibers with the 16384 flag (indicating store dependencies),
 * and compares the current snapshot with the stored value using the LB comparator. If any store is out of date or throws,
 * returns false. Otherwise, returns true if the entire subtree is up-to-date.
 *
 * @param {Object} rootFiber - The root fiber node to start the subtree traversal from.
 * @returns {boolean} True if all store snapshots in the subtree are up-to-date, false otherwise.
 */
function areStoreSnapshotsUpToDateInSubtree(rootFiber) {
  let currentFiber = rootFiber;
  while (true) {
    // Check if this fiber has the store dependency flag
    if (currentFiber.flags & 16384) {
      const updateQueue = currentFiber.updateQueue;
      // If there are stores to check
      if (updateQueue !== null && updateQueue.stores !== null) {
        const stores = updateQueue.stores;
        for (let i = 0; i < stores.length; i++) {
          const store = stores[i];
          const getSnapshot = store.getSnapshot;
          const lastValue = store.value;
          try {
            // If the current snapshot does not match the last value, the store is out of date
            if (!LB(getSnapshot(), lastValue)) {
              return false;
            }
          } catch (error) {
            // If getting the snapshot throws, consider isBlobOrFileLikeObject out of date
            return false;
          }
        }
      }
    }
    // Traverse to child if subtree has store dependencies
    const childFiber = currentFiber.child;
    if ((currentFiber.subtreeFlags & 16384) && childFiber !== null) {
      childFiber.return = currentFiber;
      currentFiber = childFiber;
    } else {
      // If at the root again, break
      if (currentFiber === rootFiber) {
        break;
      }
      // Traverse to next sibling or up to parent
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

module.exports = areStoreSnapshotsUpToDateInSubtree;