/**
 * Synchronizes the observable object'createInteractionAccessor state with its underlying DOM node.
 * Ensures the observable reflects the latest node state, cleans up stale properties,
 * and updates internal tracking for change detection.
 *
 * @param {Object} observable - The observable object to synchronize. Must have _node, _inc, _refresh, and $$length properties.
 * @returns {void}
 */
function syncObservableWithNodeState(observable) {
  // Determine the current increment value from the node or its owner document
  const currentIncrement = observable._node._inc || observable._node.ownerDocument._inc;

  // Only proceed if the observable'createInteractionAccessor increment is out of sync
  if (observable._inc !== currentIncrement) {
    // Refresh the observable'createInteractionAccessor state from its node
    const refreshedState = observable._refresh(observable._node);

    // Update the 'length' property and check if cleanup is needed
    assignPropertyValue(observable, "length", refreshedState.length);
    if (!observable.$$length || refreshedState.length < observable.$$length) {
      // Remove any extra properties that are no longer valid
      for (let index = refreshedState.length; index in observable; index++) {
        if (Object.prototype.hasOwnProperty.call(observable, index)) {
          delete observable[index];
        }
      }
    }

    // Copy refreshed state into the observable
    copyOwnProperties(refreshedState, observable);
    // Update the observable'createInteractionAccessor increment to match the node
    observable._inc = currentIncrement;
  }
}

module.exports = syncObservableWithNodeState;