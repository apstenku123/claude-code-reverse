/**
 * Handles the unmounting process for a given component node, including cleanup, logging, and queue management.
 *
 * @param {Object} componentNode - The component node to unmount.
 * @param {boolean} isSimulatedUnmount - Indicates if the unmount is simulated (true) or real (false).
 * @returns {void}
 */
function handleComponentUnmount(componentNode, isSimulatedUnmount) {
  // If global logging is enabled, log the unmount event
  if (sendHttpRequestOverSocket) {
    N2(
      "recordUnmount()",
      componentNode,
      null,
      isSimulatedUnmount ? "unmount is simulated" : ""
    );
  }

  // If a current component is tracked, and this node is the current or its alternate, reset the current
  if (dC !== null) {
    if (componentNode === dC || componentNode === dC.alternate) {
      X01(null);
    }
  }

  // Attempt to get the error-like object associated with this component
  const errorLikeObject = BZ(componentNode);
  if (errorLikeObject === null) return;

  const queueItem = errorLikeObject;
  const isNotifySubscribersTag = componentNode.tag === J4;

  // If this is a subscriber notification, set the global queue
  if (isNotifySubscribersTag) {
    isSourceObservable = queueItem;
  } else if (!shouldProcessNode(componentNode)) {
    // If the component is not in a certain state, push to the appropriate queue
    if (isSimulatedUnmount) {
      $H.push(queueItem);
    } else {
      Jq.push(queueItem);
    }
  }

  // If the component does not need to be remounted, perform cleanup
  if (!componentNode._debugNeedsRemount) {
    scheduleFiberForUntracking(componentNode);
    const hasTreeBaseDuration = componentNode.hasOwnProperty("treeBaseDuration");
    if (hasTreeBaseDuration) {
      Up.delete(queueItem);
      Ep.delete(queueItem);
    }
  }
}

module.exports = handleComponentUnmount;