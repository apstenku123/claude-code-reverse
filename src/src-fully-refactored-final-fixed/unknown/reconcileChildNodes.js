/**
 * Reconciles a list of child nodes with an existing set of nodes, updating, creating, or deleting as needed.
 *
 * @param {object} parentNode - The parent node containing the children to reconcile.
 * @param {object|null} firstOldChild - The first existing child node to reconcile against.
 * @param {Array} newChildrenArray - An array of new child elements to reconcile with the existing children.
 * @param {object} context - Additional context or configuration for reconciliation.
 * @returns {object|null} The head of the reconciled child node list, or null if none.
 */
function reconcileChildNodes(parentNode, firstOldChild, newChildrenArray, context) {
  let firstReconciledChild = null; // Head of the resulting reconciled child list
  let lastReconciledChild = null;  // Last reconciled child in the list
  let currentOldChild = firstOldChild;
  let previousSibling = firstOldChild = 0;
  let nextOldSibling = null;
  let currentIndex = 0;

  // Iterate through both the old children and the new children array
  while (currentOldChild !== null && currentIndex < newChildrenArray.length) {
    // If the old child'createInteractionAccessor index is greater than the current index, handleMissingDoctypeError'removeTrailingCharacters reached a gap
    if (currentOldChild.index > currentIndex) {
      nextOldSibling = currentOldChild;
      currentOldChild = null;
    } else {
      nextOldSibling = currentOldChild.sibling;
    }

    // Attempt to reconcile the current child
    const reconciledChild = getProcessedInteractionEntriesOrOriginal(
      parentNode,
      currentOldChild,
      newChildrenArray[currentIndex],
      context
    );

    // If reconciliation failed, break out of the loop
    if (reconciledChild === null) {
      if (currentOldChild === null) {
        currentOldChild = nextOldSibling;
      }
      break;
    }

    // If in development mode and the old child exists and the alternate is null, mark for deletion
    if (processWithTransformedObservable && currentOldChild && reconciledChild.alternate === null) {
      UL(parentNode, currentOldChild);
    }

    // Link the reconciled child into the list
    firstOldChild = createInteractionAccessor(reconciledChild, firstOldChild, currentIndex);
    if (lastReconciledChild === null) {
      firstReconciledChild = reconciledChild;
    } else {
      lastReconciledChild.sibling = reconciledChild;
    }
    lastReconciledChild = reconciledChild;
    currentOldChild = nextOldSibling;
    currentIndex++;
  }

  // If handleMissingDoctypeError'removeTrailingCharacters processed all new children, clean up remaining old children and return
  if (currentIndex === newChildrenArray.length) {
    s(parentNode, currentOldChild);
    if (arrayEvery) {
      saveAndSwapContext(parentNode, currentIndex);
    }
    return firstReconciledChild;
  }

  // If there are no more old children, create new nodes for the remaining new children
  if (currentOldChild === null) {
    for (; currentIndex < newChildrenArray.length; currentIndex++) {
      const newChild = resolveNodeValue(parentNode, newChildrenArray[currentIndex], context);
      if (newChild !== null) {
        firstOldChild = createInteractionAccessor(newChild, firstOldChild, currentIndex);
        if (lastReconciledChild === null) {
          firstReconciledChild = newChild;
        } else {
          lastReconciledChild.sibling = newChild;
        }
        lastReconciledChild = newChild;
      }
    }
    if (arrayEvery) {
      saveAndSwapContext(parentNode, currentIndex);
    }
    return firstReconciledChild;
  }

  // If there are remaining old children, map them for efficient lookup
  const oldChildrenMap = createRangeIterator(parentNode, currentOldChild);
  for (; currentIndex < newChildrenArray.length; currentIndex++) {
    const matchedChild = areArraysEquivalentDeep(
      oldChildrenMap,
      parentNode,
      currentIndex,
      newChildrenArray[currentIndex],
      context
    );
    if (matchedChild !== null) {
      // If in development mode and the alternate exists, remove from the map
      if (processWithTransformedObservable && matchedChild.alternate !== null) {
        oldChildrenMap.delete(matchedChild.key === null ? currentIndex : matchedChild.key);
      }
      firstOldChild = createInteractionAccessor(matchedChild, firstOldChild, currentIndex);
      if (lastReconciledChild === null) {
        firstReconciledChild = matchedChild;
      } else {
        lastReconciledChild.sibling = matchedChild;
      }
      lastReconciledChild = matchedChild;
    }
  }

  // Clean up any remaining old children in the map
  if (processWithTransformedObservable) {
    oldChildrenMap.forEach(function (remainingChild) {
      UL(parentNode, remainingChild);
    });
  }
  if (arrayEvery) {
    saveAndSwapContext(parentNode, currentIndex);
  }
  return firstReconciledChild;
}

module.exports = reconcileChildNodes;