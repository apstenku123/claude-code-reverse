/**
 * Handles the commit phase for deletions and post-commit effects in the fiber tree.
 * This function processes pending deletions, applies post-commit effects, and invokes any post-commit hooks.
 *
 * @returns {boolean} True if the commit phase was processed, false otherwise.
 */
function commitDeletionsAndPostCommitEffects() {
  // If there is no pending root to process, return false
  if (pendingCommitRoot !== null) {
    const lanes = getLanesToFlush(currentRootLanes);
    const previousTransition = transitionContext.transition;
    const previousPriority = currentPriority;
    let didCommit = false;
    try {
      // Set up commit context
      transitionContext.transition = null;
      currentPriority = lanes < 16 ? 16 : lanes;
      if (pendingCommitRoot === null) {
        didCommit = false;
      } else {
        // Save and clear the pending commit root
        const root = pendingCommitRoot;
        pendingCommitRoot = null;
        currentRootLanes = 0;
        // If the root is in an invalid state, throw
        if ((executionContext & 6) !== 0) throw Error(getErrorMessage(331));
        const previousExecutionContext = executionContext;
        executionContext |= 4;
        // Traverse the fiber tree to process deletions
        for (let fiber = root.current; fiber !== null;) {
          const currentFiber = fiber;
          const childFiber = currentFiber.child;
          // If this fiber has deletions to process
          if ((currentFiber.flags & 16) !== 0) {
            const deletions = currentFiber.deletions;
            if (deletions !== null) {
              for (let deletionIndex = 0; deletionIndex < deletions.length; deletionIndex++) {
                const deletionFiber = deletions[deletionIndex];
                // Traverse the subtree of the deleted fiber
                for (let subtreeFiber = deletionFiber; subtreeFiber !== null;) {
                  const node = subtreeFiber;
                  switch (node.tag) {
                    case 0:
                    case 11:
                    case 15:
                      // Perform the deletion effect
                      commitDeletionEffect(8, node, currentFiber);
                  }
                  const child = node.child;
                  if (child !== null) {
                    child.return = node;
                    subtreeFiber = child;
                  } else {
                    // Traverse up and across siblings
                    while (subtreeFiber !== null) {
                      const parent = subtreeFiber;
                      const { sibling, return: parentReturn } = parent;
                      cleanupFiber(parent);
                      if (parent === deletionFiber) {
                        subtreeFiber = null;
                        break;
                      }
                      if (sibling !== null) {
                        sibling.return = parentReturn;
                        subtreeFiber = sibling;
                        break;
                      }
                      subtreeFiber = parentReturn;
                    }
                  }
                }
              }
              // Clean up alternate children for the deleted fiber
              const alternate = currentFiber.alternate;
              if (alternate !== null) {
                let alternateChild = alternate.child;
                if (alternateChild !== null) {
                  alternate.child = null;
                  do {
                    const nextSibling = alternateChild.sibling;
                    alternateChild.sibling = null;
                    alternateChild = nextSibling;
                  } while (alternateChild !== null);
                }
              }
              fiber = currentFiber;
            }
          }
          // If the subtree has effects to process, descend into child
          if ((currentFiber.subtreeFlags & 2064) !== 0 && childFiber !== null) {
            childFiber.return = currentFiber;
            fiber = childFiber;
          } else {
            // Otherwise, traverse up and across siblings
            traversal: while (fiber !== null) {
              const node = fiber;
              if ((node.flags & 2048) !== 0) {
                switch (node.tag) {
                  case 0:
                  case 11:
                  case 15:
                    commitDeletionEffect(9, node, node.return);
                }
              }
              const sibling = node.sibling;
              if (sibling !== null) {
                sibling.return = node.return;
                fiber = sibling;
                break traversal;
              }
              fiber = node.return;
            }
          }
        }
        // Second pass: handle post-commit effects
        const rootFiber = root.current;
        for (let fiber = rootFiber; fiber !== null;) {
          let childFiber = fiber.child;
          if ((fiber.subtreeFlags & 2064) !== 0 && childFiber !== null) {
            childFiber.return = fiber;
            fiber = childFiber;
          } else {
            traversal: for (let ancestor = rootFiber; fiber !== null;) {
              const node = fiber;
              if ((node.flags & 2048) !== 0) {
                try {
                  switch (node.tag) {
                    case 0:
                    case 11:
                    case 15:
                      commitPostEffect(9, node);
                  }
                } catch (error) {
                  handleCommitError(node, node.return, error);
                }
              }
              if (node === ancestor) {
                fiber = null;
                break traversal;
              }
              const sibling = node.sibling;
              if (sibling !== null) {
                sibling.return = node.return;
                fiber = sibling;
                break traversal;
              }
              fiber = node.return;
            }
          }
        }
        // Restore execution context
        executionContext = previousExecutionContext;
        // Call any post-commit hooks
        flushPassiveEffects();
        if (devToolsHook && typeof devToolsHook.onPostCommitFiberRoot === "function") {
          try {
            devToolsHook.onPostCommitFiberRoot(devToolsFiberRoot, root);
          } catch (error) {}
        }
        didCommit = true;
      }
      return didCommit;
    } finally {
      // Restore previous context
      currentPriority = previousPriority;
      transitionContext.transition = previousTransition;
    }
  }
  return false;
}

module.exports = commitDeletionsAndPostCommitEffects;