/**
 * Handles the unmounting process for a component, including cleanup of related records and subscriptions.
 * Notifies subscribers, manages simulated unmounts, and removes performance tracking data if necessary.
 *
 * @param {Object} component - The component instance to unmount.
 * @param {boolean} isSimulatedUnmount - Indicates if the unmount is simulated (e.g., for testing purposes).
 * @returns {void}
 */
function unmountComponentAndCleanup(component, isSimulatedUnmount) {
  // Log the unmount event if logging is enabled
  if (typeof sendHttpRequestOverSocket !== 'undefined' && sendHttpRequestOverSocket) {
    N2(
      "recordUnmount()",
      component,
      null,
      isSimulatedUnmount ? "unmount is simulated" : ""
    );
  }

  // If the component is the current one being processed, trigger cleanup
  if (dC !== null) {
    if (component === dC || component === dC.alternate) {
      X01(null);
    }
  }

  // Retrieve the error-like object associated with the component
  const errorLikeObject = BZ(component);
  if (errorLikeObject === null) return;

  const record = errorLikeObject;
  const isNotifySubscribersTag = component.tag === J4;

  // If the component is a subscriber, update the global reference
  if (isNotifySubscribersTag) {
    isSourceObservable = record;
  } else if (!shouldProcessNode(component)) {
    // If the component is not a boundary and is a simulated unmount, queue for simulated unmounts
    if (isSimulatedUnmount) {
      $H.push(record);
    } else {
      // Otherwise, queue for real unmounts
      Jq.push(record);
    }
  }

  // If the component does not need to be remounted, perform cleanup
  if (!component._debugNeedsRemount) {
    scheduleFiberForUntracking(component);
    const hasTreeBaseDuration = component.hasOwnProperty("treeBaseDuration");
    // Remove performance tracking data if present
    if (hasTreeBaseDuration) {
      Up.delete(record);
      Ep.delete(record);
    }
  }
}

module.exports = unmountComponentAndCleanup;