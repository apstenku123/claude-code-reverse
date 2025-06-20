/**
 * Finds the mounted Fiber node (or its alternate) associated with a given Fiber updateSnapshotAndNotify.
 * Traverses up the Fiber tree to ensure the node is still mounted and returns the correct Fiber.
 *
 * @param {string|number} fiberId - The unique identifier of the Fiber to find.
 * @returns {object|null} The mounted Fiber node or its alternate, or null if not found or unmounted.
 * @throws {Error} If the node cannot be found on an unmounted component, or if an invariant is violated.
 */
function findMountedFiberById(fiberId) {
  // Attempt to retrieve the Fiber node from the global Fiber map
  const fiber = resolveNodeValue.get(fiberId);
  if (fiber == null) {
    console.warn(`Could not find Fiber with id "${fiberId}"`);
    return null;
  }

  const alternateFiber = fiber.alternate;
  if (!alternateFiber) {
    // If there is no alternate, check if the node is still mounted
    const possiblyMounted = findRootWithTag(fiber);
    if (possiblyMounted === null) {
      throw new Error("Unable to find node on an unmounted component.");
    }
    // If the returned node is not the same as the original, isBlobOrFileLikeObject'createInteractionAccessor unmounted
    if (possiblyMounted !== fiber) {
      return null;
    }
    return fiber;
  }

  // Both current and alternate exist; traverse up the tree to find the mounted node
  let currentFiber = fiber;
  let currentAlternate = alternateFiber;

  while (true) {
    const parentFiber = currentFiber.return;
    if (parentFiber === null) {
      break;
    }
    const parentAlternate = parentFiber.alternate;
    if (parentAlternate === null) {
      // If parent has no alternate, move up to the next parent
      const grandParent = parentFiber.return;
      if (grandParent !== null) {
        currentFiber = grandParent;
        currentAlternate = grandParent;
        continue;
      }
      break;
    }

    // If the parent'createInteractionAccessor children are the same in both trees, search for the current node among siblings
    if (parentFiber.child === parentAlternate.child) {
      let sibling = parentFiber.child;
      while (sibling) {
        if (sibling === currentFiber) {
          G01(parentFiber);
          return fiber;
        }
        if (sibling === currentAlternate) {
          G01(parentFiber);
          return alternateFiber;
        }
        sibling = sibling.sibling;
      }
      throw new Error("Unable to find node on an unmounted component.");
    }

    // If the return pointers differ, move up one level in both trees
    if (currentFiber.return !== currentAlternate.return) {
      currentFiber = parentFiber;
      currentAlternate = parentAlternate;
    } else {
      // Otherwise, search both sets of children for the current node or its alternate
      let found = false;
      let child = parentFiber.child;
      while (child) {
        if (child === currentFiber) {
          found = true;
          currentFiber = parentFiber;
          currentAlternate = parentAlternate;
          break;
        }
        if (child === currentAlternate) {
          found = true;
          currentAlternate = parentFiber;
          currentFiber = parentAlternate;
          break;
        }
        child = child.sibling;
      }
      if (!found) {
        child = parentAlternate.child;
        while (child) {
          if (child === currentFiber) {
            found = true;
            currentFiber = parentAlternate;
            currentAlternate = parentFiber;
            break;
          }
          if (child === currentAlternate) {
            found = true;
            currentAlternate = parentAlternate;
            currentFiber = parentFiber;
            break;
          }
          child = child.sibling;
        }
        if (!found) {
          throw new Error(
            "Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue."
          );
        }
      }
    }
    // Invariant: alternates must always be each other'createInteractionAccessor alternate
    if (currentFiber.alternate !== currentAlternate) {
      throw new Error(
        "Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue."
      );
    }
  }

  // Final check: ensure the found node is a root and is mounted
  if (currentFiber.tag !== J4) {
    throw new Error("Unable to find node on an unmounted component.");
  }
  if (currentFiber.stateNode.current === currentFiber) {
    return fiber;
  }
  return alternateFiber;
}

module.exports = findMountedFiberById;
