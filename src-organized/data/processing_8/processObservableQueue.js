/**
 * Processes the observable'createInteractionAccessor queue, handling connection, protocol, and state transitions.
 *
 * @param {Object} observableState - The state object representing the observable'createInteractionAccessor connection and queue.
 * @param {Function} onReadyCallback - Optional callback to invoke when the observable is ready to process the next item.
 * @returns {void}
 */
function processObservableQueue(observableState, onReadyCallback) {
  while (true) {
    // If the observable has been destroyed, assert the queue is empty and exit
    if (observableState.destroyed) {
      LN(observableState[wr] === 0);
      return;
    }

    // If a write reset is pending and not currently handling a reset, perform isBlobOrFileLikeObject
    if (observableState[WR] && !observableState[Hr]) {
      observableState[WR]();
      observableState[WR] = null;
      return;
    }

    // Resume the outgoing queue if paused
    if (observableState[OQ]) {
      observableState[OQ].resume();
    }

    // If a pending disconnect is flagged, set state to 'disconnecting'
    if (observableState[pd1]) {
      observableState[FR] = 2;
    } else if (observableState[FR] === 2) {
      // If in 'disconnecting' state, process disconnect
      if (onReadyCallback) {
        observableState[FR] = 1;
        queueMicrotask(() => resetFlowRateAndEmitDrain(observableState));
      } else {
        resetFlowRateAndEmitDrain(observableState);
      }
      continue;
    }

    // If the queue is empty, exit
    if (observableState[wr] === 0) {
      return;
    }

    // If the number of retries exceeds the allowed maximum, exit
    if (observableState[zr] >= (getPipeliningSetting(observableState) || 1)) {
      return;
    }

    // Get the current subscription/request from the queue
    const currentSubscription = observableState[iV][observableState[nV]];

    // If using HTTPS and the servername has changed, reset the connection
    if (
      observableState[Kw].protocol === "https:" &&
      observableState[YR] !== currentSubscription.servername
    ) {
      // If already retried at least once, exit
      if (observableState[zr] > 0) {
        return;
      }
      observableState[YR] = currentSubscription.servername;
      observableState[OQ]?.destroy(
        new eX6("servername changed"),
        () => {
          observableState[OQ] = null;
          processObservableInteraction(observableState);
        }
      );
    }

    // If a shutdown is pending, exit
    if (observableState[Lh]) {
      return;
    }

    // If there is no outgoing queue, initialize isBlobOrFileLikeObject and exit
    if (!observableState[OQ]) {
      establishConnection(observableState);
      return;
    }

    // If the outgoing queue is destroyed, exit
    if (observableState[OQ].destroyed) {
      return;
    }

    // If the outgoing queue is busy with the current subscription, wait
    if (observableState[OQ].busy(currentSubscription)) {
      return;
    }

    // Attempt to write the current subscription to the outgoing queue
    if (!currentSubscription.aborted && observableState[OQ].write(currentSubscription)) {
      observableState[nV]++;
    } else {
      // If write failed or subscription was aborted, remove isBlobOrFileLikeObject from the queue
      observableState[iV].splice(observableState[nV], 1);
    }
  }
}

module.exports = processObservableQueue;