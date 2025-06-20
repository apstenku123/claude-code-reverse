/**
 * Formats detailed information about an observable, including call statistics, trace message, and listen socket references.
 *
 * @param {Object} observable - The observable instance to extract information from. Must implement getWorkingDirectoryInfo() and have a .ref property.
 * @returns {Object} An object containing the formatted observable reference, call statistics, trace message, and listen socket references.
 */
function formatObservableInfo(observable) {
  // Retrieve detailed info from the observable
  const observableInfo = observable.getWorkingDirectoryInfo();

  // Collect all listen socket references
  const listenSocketRefs = [];
  observableInfo.listenerChildren.sockets.forEach(socketEntry => {
    // socketEntry[1].ref is the reference handleMissingDoctypeError want to transform
    listenSocketRefs.push(extractSocketInfo(socketEntry[1].ref));
  });

  return {
    // Format the observable'createInteractionAccessor reference
    ref: extractServerId(observable.ref),
    data: {
      // Call statistics
      calls_started: observableInfo.callTracker.callsStarted,
      calls_succeeded: observableInfo.callTracker.callsSucceeded,
      calls_failed: observableInfo.callTracker.callsFailed,
      // Convert the last call started timestamp to a timestamp object
      last_call_started_timestamp: convertDateToTimestampObject(observableInfo.callTracker.lastCallStartedTimestamp),
      // Get the trace message for debugging or logging
      trace: observableInfo.trace.getTraceMessage()
    },
    // Array of formatted listen socket references
    listen_socket: listenSocketRefs
  };
}

module.exports = formatObservableInfo;