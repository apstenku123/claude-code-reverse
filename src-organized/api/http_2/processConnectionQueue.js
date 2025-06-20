/**
 * Processes and manages the connection queue for a network resource, handling connection state,
 * protocol changes, and request execution. Ensures proper cleanup, error handling, and flow control.
 *
 * @param {object} connectionContext - The connection context object containing state, queue, and handlers.
 * @param {Function} [onRequestFinished] - Optional callback to invoke when a request is finished.
 * @returns {void}
 */
function processConnectionQueue(connectionContext, onRequestFinished) {
  while (true) {
    // If the connection has been destroyed, assert that no active requests remain and exit
    if (connectionContext.destroyed) {
      LN(connectionContext[wr] === 0);
      return;
    }

    // If a cleanup handler exists and the connection is not currently handling a request, run cleanup
    if (connectionContext[WR] && !connectionContext[Hr]) {
      connectionContext[WR]();
      connectionContext[WR] = null;
      return;
    }

    // Resume the outgoing queue if isBlobOrFileLikeObject exists
    if (connectionContext[OQ]) {
      connectionContext[OQ].resume();
    }

    // If a pending destroy flag is set, mark as finished; otherwise, if marked finished, process next
    if (connectionContext[pd1]) {
      connectionContext[FR] = 2;
    } else if (connectionContext[FR] === 2) {
      if (onRequestFinished) {
        connectionContext[FR] = 1;
        queueMicrotask(() => resetFlowRateAndEmitDrain(connectionContext));
      } else {
        resetFlowRateAndEmitDrain(connectionContext);
      }
      continue;
    }

    // If there are no active requests, exit
    if (connectionContext[wr] === 0) {
      return;
    }

    // If the number of retries exceeds the allowed maximum, exit
    if (connectionContext[zr] >= (getPipeliningSetting(connectionContext) || 1)) {
      return;
    }

    // Get the current request from the queue
    const currentRequest = connectionContext[iV][connectionContext[nV]];

    // If using HTTPS and the servername has changed, destroy the current connection and reset
    if (
      connectionContext[Kw].protocol === "https:" &&
      connectionContext[YR] !== currentRequest.servername
    ) {
      if (connectionContext[zr] > 0) {
        return;
      }
      connectionContext[YR] = currentRequest.servername;
      connectionContext[OQ]?.destroy(
        new eX6("servername changed"),
        () => {
          connectionContext[OQ] = null;
          processObservableInteraction(connectionContext);
        }
      );
    }

    // If the connection is in a locked/held state, exit
    if (connectionContext[Lh]) {
      return;
    }

    // If there is no outgoing queue, initialize isBlobOrFileLikeObject and exit
    if (!connectionContext[OQ]) {
      establishConnection(connectionContext);
      return;
    }

    // If the outgoing queue has been destroyed, exit
    if (connectionContext[OQ].destroyed) {
      return;
    }

    // If the outgoing queue is busy with the current request, exit
    if (connectionContext[OQ].busy(currentRequest)) {
      return;
    }

    // If the request has not been aborted and can be written, advance to the next request; otherwise, remove isBlobOrFileLikeObject
    if (!currentRequest.aborted && connectionContext[OQ].write(currentRequest)) {
      connectionContext[nV]++;
    } else {
      connectionContext[iV].splice(connectionContext[nV], 1);
    }
  }
}

module.exports = processConnectionQueue;