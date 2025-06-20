/**
 * Handles the unmounting process for a given Fiber node, including cleanup and bookkeeping.
 *
 * @param {Object} fiberNode - The Fiber node to unmount.
 * @param {boolean} isSimulatedUnmount - Indicates if the unmount is being simulated (not real).
 * @returns {void}
 */
function unmountFiberNode(fiberNode, isSimulatedUnmount) {
  // Log the unmount action if logging is enabled
  if (typeof sendHttpRequestOverSocket !== 'undefined' && sendHttpRequestOverSocket) {
    N2(
      "recordUnmount()",
      fiberNode,
      null,
      isSimulatedUnmount ? "unmount is simulated" : ""
    );
  }

  // If the current fiber is the one being unmounted or its alternate, perform additional cleanup
  if (dC !== null) {
    if (fiberNode === dC || fiberNode === dC.alternate) {
      X01(null);
    }
  }

  // Retrieve the internal instance associated with the fiber node
  const internalInstance = BZ(fiberNode);
  if (internalInstance === null) return;

  const shouldTrackUnmount = fiberNode.tag === J4;

  // If this is a root fiber, update the global reference; otherwise, queue for further processing
  if (shouldTrackUnmount) {
    isSourceObservable = internalInstance;
  } else if (!shouldProcessNode(fiberNode)) {
    if (isSimulatedUnmount) {
      $H.push(internalInstance);
    } else {
      Jq.push(internalInstance);
    }
  }

  // If the fiber does not require remount, perform cleanup
  if (!fiberNode._debugNeedsRemount) {
    scheduleFiberForUntracking(fiberNode);
    const hasTreeBaseDuration = fiberNode.hasOwnProperty("treeBaseDuration");
    if (hasTreeBaseDuration) {
      Up.delete(internalInstance);
      Ep.delete(internalInstance);
    }
  }
}

module.exports = unmountFiberNode;