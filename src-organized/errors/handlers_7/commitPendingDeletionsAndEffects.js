/**
 * Processes and commits all pending deletions and effects in the fiber tree.
 * This function is typically called during the commit phase of a React-like reconciler.
 * It traverses the fiber tree, applies deletions, handles effects, and invokes post-commit hooks.
 *
 * @returns {boolean} True if the commit was successful, false otherwise.
 */
function commitPendingDeletionsAndEffects() {
  // If there is no pending root, return false
  if (pendingRoot !== null) {
    const expirationTime = getExpirationTime(currentRootExpirationTime);
    const previousTransition = transitionContext.transition;
    const previousPriority = currentPriorityLevel;
    let commitSucceeded;

    try {
      // Prepare for commit: clear transition and set priority
      transitionContext.transition = null;
      currentPriorityLevel = expirationTime < 16 ? 16 : expirationTime;

      // If pendingRoot was cleared during preparation, nothing to do
      if (pendingRoot === null) {
        commitSucceeded = false;
      } else {
        // Save and clear the pending root
        const root = pendingRoot;
        pendingRoot = null;
        currentRootExpirationTime = 0;

        // If the commit phase is already in progress, throw
        if ((commitPhase & 6) !== 0) throw Error(getErrorMessage(331));

        // Save current commit phase and set to 'commit'
        const previousCommitPhase = commitPhase;
        commitPhase |= 4;

        // Traverse the fiber tree for deletions and effects
        for (let fiber = root.current; fiber !== null;) {
          const currentFiber = fiber;
          const childFiber = currentFiber.child;

          // Handle deletions
          if ((currentFiber.flags & 16) !== 0) {
            const deletions = currentFiber.deletions;
            if (deletions !== null) {
              for (let i = 0; i < deletions.length; i++) {
                const deletion = deletions[i];
                // Traverse subtree for deletion
                for (let node = deletion; node !== null;) {
                  const currentNode = node;
                  switch (currentNode.tag) {
                    case 0: // HostComponent
                    case 11: // ContextProvider
                    case 15: // SomeOtherTag
                      commitDeletionEffect(8, currentNode, currentFiber);
                      break;
                  }
                  // Traverse children first
                  const childNode = currentNode.child;
                  if (childNode !== null) {
                    childNode.return = currentNode;
                    node = childNode;
                  } else {
                    // Traverse siblings and up the tree
                    while (node !== null) {
                      const {
                        sibling: siblingNode,
                        return: returnNode
                      } = node;
                      cleanupAfterDeletion(node);
                      if (node === deletion) {
                        node = null;
                        break;
                      }
                      if (siblingNode !== null) {
                        siblingNode.return = returnNode;
                        node = siblingNode;
                        break;
                      }
                      node = returnNode;
                    }
                  }
                }
              }
              // Clean up alternate children
              const alternate = currentFiber.alternate;
              if (alternate !== null) {
                let altChild = alternate.child;
                if (altChild !== null) {
                  alternate.child = null;
                  do {
                    const nextSibling = altChild.sibling;
                    altChild.sibling = null;
                    altChild = nextSibling;
                  } while (altChild !== null);
                }
              }
              fiber = currentFiber;
            }
          }

          // Traverse subtree for passive and layout effects
          if ((currentFiber.subtreeFlags & 2064) !== 0 && childFiber !== null) {
            childFiber.return = currentFiber;
            fiber = childFiber;
          } else {
            // Traverse siblings and up the tree for effects
            traversal: while (fiber !== null) {
              const effectFiber = fiber;
              if ((effectFiber.flags & 2048) !== 0) {
                switch (effectFiber.tag) {
                  case 0:
                  case 11:
                  case 15:
                    commitDeletionEffect(9, effectFiber, effectFiber.return);
                    break;
                }
              }
              const siblingFiber = effectFiber.sibling;
              if (siblingFiber !== null) {
                siblingFiber.return = effectFiber.return;
                fiber = siblingFiber;
                break traversal;
              }
              fiber = effectFiber.return;
            }
          }
        }

        // Second pass: handle errors in effects
        const rootFiber = root.current;
        for (let fiber = rootFiber; fiber !== null;) {
          let childFiber = fiber.child;
          if ((fiber.subtreeFlags & 2064) !== 0 && childFiber !== null) {
            childFiber.return = fiber;
            fiber = childFiber;
          } else {
            traversal: for (let effectRoot = rootFiber; fiber !== null;) {
              const effectFiber = fiber;
              if ((effectFiber.flags & 2048) !== 0) {
                try {
                  switch (effectFiber.tag) {
                    case 0:
                    case 11:
                    case 15:
                      commitPassiveEffect(9, effectFiber);
                      break;
                  }
                } catch (error) {
                  handleCommitError(effectFiber, effectFiber.return, error);
                }
              }
              if (effectFiber === effectRoot) {
                fiber = null;
                break traversal;
              }
              const siblingFiber = effectFiber.sibling;
              if (siblingFiber !== null) {
                siblingFiber.return = effectFiber.return;
                fiber = siblingFiber;
                break traversal;
              }
              fiber = effectFiber.return;
            }
          }
        }

        // Restore commit phase
        commitPhase = previousCommitPhase;
        // Call post-commit hook if present
        finalizeCommit();
        if (devToolsHook && typeof devToolsHook.onPostCommitFiberRoot === "function") {
          try {
            devToolsHook.onPostCommitFiberRoot(globalFiberRoot, root);
          } catch (error) {}
        }
        commitSucceeded = true;
      }
      return commitSucceeded;
    } finally {
      // Restore previous priority and transition context
      currentPriorityLevel = previousPriority;
      transitionContext.transition = previousTransition;
    }
  }
  return false;
}

module.exports = commitPendingDeletionsAndEffects;