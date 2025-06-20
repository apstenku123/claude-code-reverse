/**
 * Processes a SuspenseList component during the render phase, handling reveal order and tail logic.
 *
 * @param {Fiber|null} previousFiber - The previous fiber node (can be null on initial mount).
 * @param {Fiber} currentFiber - The current fiber node representing the SuspenseList.
 * @param {number} renderLanes - The lanes for the current render pass.
 * @returns {Fiber|null} The first child fiber of the SuspenseList after processing.
 *
 * This function manages the SuspenseList'createInteractionAccessor reveal order (forwards, backwards, together),
 * updates context, and handles fallback/tail logic for Suspense boundaries within the list.
 */
function processSuspenseListComponent(previousFiber, currentFiber, renderLanes) {
  const pendingProps = currentFiber.pendingProps;
  const revealOrder = pendingProps.revealOrder;
  const tailConfig = pendingProps.tail;

  // Begin rendering children of the SuspenseList
  updateChildNode(previousFiber, currentFiber, pendingProps.children, renderLanes);

  // Read the current SuspenseList context
  let suspenseListContext = getReactElementType.current;

  // If handleMissingDoctypeError're in a nested SuspenseList context (bitmask check)
  if ((suspenseListContext & 2) !== 0) {
    // Set context to "force fallback" and mark current fiber for update
    suspenseListContext = (suspenseListContext & 1) | 2;
    currentFiber.flags |= 128;
  } else {
    // If the previous fiber was forced to fallback, propagate that to children
    if (
      previousFiber !== null &&
      (previousFiber.flags & 128) !== 0
    ) {
      // Walk the subtree to propagate fallback state to all Suspense boundaries
      traversal: for (
        let childFiber = currentFiber.child;
        childFiber !== null;
      ) {
        if (childFiber.tag === 13) {
          // Suspense boundary
          if (childFiber.memoizedState !== null) {
            emitEventWithAttributes(childFiber, renderLanes, currentFiber);
          }
        } else if (childFiber.tag === 19) {
          // Nested SuspenseList
          emitEventWithAttributes(childFiber, renderLanes, currentFiber);
        } else if (childFiber.child !== null) {
          // Traverse down
          childFiber.child.return = childFiber;
          childFiber = childFiber.child;
          continue;
        }
        if (childFiber === currentFiber) break traversal;
        while (childFiber.sibling === null) {
          if (
            childFiber.return === null ||
            childFiber.return === currentFiber
          ) {
            break traversal;
          }
          childFiber = childFiber.return;
        }
        childFiber.sibling.return = childFiber.return;
        childFiber = childFiber.sibling;
      }
    }
    // Only keep the "force fallback" bit if set
    suspenseListContext &= 1;
  }

  // Push the updated SuspenseList context
  nA(getReactElementType, suspenseListContext);

  // If not in concurrent mode, clear memoized state
  if ((currentFiber.mode & 1) === 0) {
    currentFiber.memoizedState = null;
  } else {
    // Handle reveal order logic for concurrent mode
    switch (revealOrder) {
      case "forwards": {
        // Find the last fallback child (if any)
        let lastFallbackChild = null;
        let child = currentFiber.child;
        while (child !== null) {
          const alternate = child.alternate;
          if (alternate !== null && findSuspenseOrRevealFiber(alternate) === null) {
            lastFallbackChild = child;
          }
          child = child.sibling;
        }
        let tailStart = lastFallbackChild;
        let nextAfterTail = null;
        if (tailStart === null) {
          // No fallback found, detach all children
          nextAfterTail = currentFiber.child;
          currentFiber.child = null;
        } else {
          // Detach siblings after the last fallback
          nextAfterTail = tailStart.sibling;
          tailStart.sibling = null;
        }
        initializeOrUpdateRenderState(currentFiber, false, nextAfterTail, tailStart, tailConfig);
        break;
      }
      case "backwards": {
        // Reverse the children and find the first fallback
        let reversed = null;
        let child = currentFiber.child;
        currentFiber.child = null;
        while (child !== null) {
          const alternate = child.alternate;
          if (alternate !== null && findSuspenseOrRevealFiber(alternate) === null) {
            currentFiber.child = child;
            break;
          }
          const next = child.sibling;
          child.sibling = reversed;
          reversed = child;
          child = next;
        }
        initializeOrUpdateRenderState(currentFiber, true, reversed, null, tailConfig);
        break;
      }
      case "together": {
        // Reveal all children at once
        initializeOrUpdateRenderState(currentFiber, false, null, null, undefined);
        break;
      }
      default: {
        // Unknown reveal order, clear memoized state
        currentFiber.memoizedState = null;
      }
    }
  }

  return currentFiber.child;
}

module.exports = processSuspenseListComponent;