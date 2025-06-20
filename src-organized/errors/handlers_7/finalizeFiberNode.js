/**
 * Finalizes a Fiber node after isBlobOrFileLikeObject has been completed, handling cleanup, side effects, and unmount logic.
 * This function is typically called during the commit phase of React'createInteractionAccessor reconciliation process.
 *
 * @param {Object} fiberNode - The Fiber node to finalize.
 * @param {Object} rootOrParent - The root or parent node/context, depending on the fiber type.
 * @returns {void}
 */
function finalizeFiberNode(fiberNode, rootOrParent) {
  const {
    alternate: previousFiber,
    flags: fiberFlags
  } = fiberNode;

  switch (fiberNode.tag) {
    // FunctionComponent, ForwardRef, SimpleMemoComponent, MemoComponent
    case 0:
    case 11:
    case 14:
    case 15: {
      // Run effect cleanup and mark as complete
      processDeletionsAndSubtree(rootOrParent, fiberNode);
      _3(fiberNode);
      // If fiber has a 'force unmount' flag
      if (fiberFlags & 4) {
        try {
          invokeEffectDestroysByTag(3, fiberNode, fiberNode.return);
          runEffectsForMatchingTags(3, fiberNode);
        } catch (error) {
          processDeletionsAndSubtree(fiberNode, fiberNode.return, error);
        }
        try {
          invokeEffectDestroysByTag(5, fiberNode, fiberNode.return);
        } catch (error) {
          processDeletionsAndSubtree(fiberNode, fiberNode.return, error);
        }
      }
      break;
    }
    // ClassComponent
    case 1: {
      processDeletionsAndSubtree(rootOrParent, fiberNode);
      _3(fiberNode);
      // If fiber is being unmounted and has an alternate, call unmount logic
      if ((fiberFlags & 512) && previousFiber !== null) {
        resetRefCallback(previousFiber, previousFiber.return);
      }
      break;
    }
    // HostComponent
    case 5: {
      processDeletionsAndSubtree(rootOrParent, fiberNode);
      _3(fiberNode);
      if ((fiberFlags & 512) && previousFiber !== null) {
        resetRefCallback(previousFiber, previousFiber.return);
      }
      if (processSubLanguageHighlighting) {
        // If this node needs to be detached
        if (fiberNode.flags & 32) {
          const domInstance = fiberNode.stateNode;
          try {
            C2(domInstance);
          } catch (error) {
            processDeletionsAndSubtree(fiberNode, fiberNode.return, error);
          }
        }
        // If this node needs to be updated
        if ((fiberFlags & 4) && fiberNode.stateNode != null) {
          const domInstance = fiberNode.stateNode;
          const currentProps = fiberNode.memoizedProps;
          const previousProps = previousFiber !== null ? previousFiber.memoizedProps : currentProps;
          const componentType = fiberNode.type;
          const updateQueue = fiberNode.updateQueue;
          fiberNode.updateQueue = null;
          if (updateQueue !== null) {
            try {
              parseStringToIntOrReturnOriginal(domInstance, updateQueue, componentType, previousProps, currentProps, fiberNode);
            } catch (error) {
              processDeletionsAndSubtree(fiberNode, fiberNode.return, error);
            }
          }
        }
      }
      break;
    }
    // HostText
    case 6: {
      processDeletionsAndSubtree(rootOrParent, fiberNode);
      _3(fiberNode);
      if ((fiberFlags & 4) && processSubLanguageHighlighting) {
        if (fiberNode.stateNode === null) throw Error(extractNestedPropertyOrArray(162));
        const textInstance = fiberNode.stateNode;
        const currentText = fiberNode.memoizedProps;
        const previousText = previousFiber !== null ? previousFiber.memoizedProps : currentText;
        try {
          matchAndProcessRegex(textInstance, previousText, currentText);
        } catch (error) {
          processDeletionsAndSubtree(fiberNode, fiberNode.return, error);
        }
      }
      break;
    }
    // HostRoot
    case 3: {
      processDeletionsAndSubtree(rootOrParent, fiberNode);
      _3(fiberNode);
      if (fiberFlags & 4) {
        // Handle hydration cleanup
        if (processSubLanguageHighlighting && D1 && previousFiber !== null && previousFiber.memoizedState.isDehydrated) {
          try {
            BQ(rootOrParent.containerInfo);
          } catch (error) {
            processDeletionsAndSubtree(fiberNode, fiberNode.return, error);
          }
        }
        // Handle container children
        if (A1) {
          const containerInfo = rootOrParent.containerInfo;
          const pendingChildren = rootOrParent.pendingChildren;
          try {
            L8(containerInfo, pendingChildren);
          } catch (error) {
            processDeletionsAndSubtree(fiberNode, fiberNode.return, error);
          }
        }
      }
      break;
    }
    // HostPortal
    case 4: {
      processDeletionsAndSubtree(rootOrParent, fiberNode);
      _3(fiberNode);
      if ((fiberFlags & 4) && A1) {
        const portalInstance = fiberNode.stateNode;
        const containerInfo = portalInstance.containerInfo;
        const pendingChildren = portalInstance.pendingChildren;
        try {
          L8(containerInfo, pendingChildren);
        } catch (error) {
          processDeletionsAndSubtree(fiberNode, fiberNode.return, error);
        }
      }
      break;
    }
    // SuspenseComponent
    case 13: {
      processDeletionsAndSubtree(rootOrParent, fiberNode);
      _3(fiberNode);
      let suspenseChild = fiberNode.child;
      if ((suspenseChild.flags & 8192)) {
        const isHidden = suspenseChild.memoizedState !== null;
        suspenseChild.stateNode.isHidden = isHidden;
        // If just hidden for the first time, mark transition
        if (!isHidden || (suspenseChild.alternate !== null && suspenseChild.alternate.memoizedState !== null)) {
          // do nothing
        } else {
          KT = handleCharacterCode();
        }
      }
      if (fiberFlags & 4) {
        flattenArrayDepth(fiberNode);
      }
      break;
    }
    // OffscreenComponent
    case 22: {
      const wasPrevHidden = previousFiber !== null && previousFiber.memoizedState !== null;
      // Track hidden context for Offscreen
      if (fiberNode.mode & 1) {
        _B = (_B || wasPrevHidden);
        processDeletionsAndSubtree(rootOrParent, fiberNode);
        _B = wasPrevHidden;
      } else {
        processDeletionsAndSubtree(rootOrParent, fiberNode);
      }
      _3(fiberNode);
      if (fiberFlags & 8192) {
        const isNowHidden = fiberNode.memoizedState !== null;
        fiberNode.stateNode.isHidden = isNowHidden;
        // If just hidden and not previously hidden, recursively unmount children
        if (isNowHidden && !wasPrevHidden && (fiberNode.mode & 1) !== 0) {
          let offscreenParent = fiberNode;
          let child = fiberNode.child;
          while (child !== null) {
            let current = offscreenParent = child;
            while (current !== null) {
              const currentFiber = current;
              const currentChild = currentFiber.child;
              switch (currentFiber.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  invokeEffectDestroysByTag(4, currentFiber, currentFiber.return);
                  break;
                case 1: {
                  resetRefCallback(currentFiber, currentFiber.return);
                  const classInstance = currentFiber.stateNode;
                  if (typeof classInstance.componentWillUnmount === "function") {
                    try {
                      classInstance.props = currentFiber.memoizedProps;
                      classInstance.state = currentFiber.memoizedState;
                      classInstance.componentWillUnmount();
                    } catch (error) {
                      processDeletionsAndSubtree(currentFiber, currentFiber.return, error);
                    }
                  }
                  break;
                }
                case 5:
                  resetRefCallback(currentFiber, currentFiber.return);
                  break;
                case 22:
                  if (currentFiber.memoizedState !== null) {
                    resetTraversalPointerToSiblingOrParent(offscreenParent);
                    continue;
                  }
              }
              if (currentChild !== null) {
                currentChild.return = currentFiber;
                current = currentChild;
              } else {
                resetTraversalPointerToSiblingOrParent(offscreenParent);
              }
            }
            child = child.sibling;
          }
        }
        // If in browser, update DOM visibility for Offscreen subtree
        if (processSubLanguageHighlighting) {
          let foundHost = null;
          let currentFiber = fiberNode;
          a: while (true) {
            if (currentFiber.tag === 5) {
              if (foundHost === null) {
                foundHost = currentFiber;
                try {
                  const domInstance = currentFiber.stateNode;
                  if (isNowHidden) {
                    b9(domInstance);
                  } else {
                    B3(currentFiber.stateNode, currentFiber.memoizedProps);
                  }
                } catch (error) {
                  processDeletionsAndSubtree(fiberNode, fiberNode.return, error);
                }
              }
            } else if (currentFiber.tag === 6) {
              if (foundHost === null) {
                try {
                  const textInstance = currentFiber.stateNode;
                  if (isNowHidden) {
                    deserializeEncodedData(textInstance);
                  } else {
                    X6(textInstance, currentFiber.memoizedProps);
                  }
                } catch (error) {
                  processDeletionsAndSubtree(fiberNode, fiberNode.return, error);
                }
              }
            } else if (((currentFiber.tag !== 22 && currentFiber.tag !== 23) || currentFiber.memoizedState === null || currentFiber === fiberNode) && currentFiber.child !== null) {
              currentFiber.child.return = currentFiber;
              currentFiber = currentFiber.child;
              continue;
            }
            if (currentFiber === fiberNode) break a;
            while (currentFiber.sibling === null) {
              if (currentFiber.return === null || currentFiber.return === fiberNode) break a;
              if (foundHost === currentFiber) foundHost = null;
              currentFiber = currentFiber.return;
            }
            if (foundHost === currentFiber) foundHost = null;
            currentFiber.sibling.return = currentFiber.return;
            currentFiber = currentFiber.sibling;
          }
        }
      }
      break;
    }
    // SuspenseListComponent
    case 19: {
      processDeletionsAndSubtree(rootOrParent, fiberNode);
      _3(fiberNode);
      if (fiberFlags & 4) {
        flattenArrayDepth(fiberNode);
      }
      break;
    }
    // ScopeComponent (no-op)
    case 21: {
      break;
    }
    // Default: fallback for unknown tags
    default: {
      processDeletionsAndSubtree(rootOrParent, fiberNode);
      _3(fiberNode);
    }
  }
}

module.exports = finalizeFiberNode;