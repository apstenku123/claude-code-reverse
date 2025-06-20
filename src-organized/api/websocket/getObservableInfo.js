/**
 * Retrieves detailed information about an observable, including call statistics, trace messages, and associated listen sockets.
 *
 * @param {Object} observable - The observable object to extract information from. Must implement getWorkingDirectoryInfo() and have a ref property.
 * @returns {Object} An object containing the observable'createInteractionAccessor reference, call statistics, trace message, and listen socket references.
 */
function getObservableInfo(observable) {
  // Retrieve configuration and tracking info from the observable
  const observableInfo = observable.getWorkingDirectoryInfo();
  const listenSocketRefs = [];

  // Iterate over all listener children sockets and collect their references
  observableInfo.listenerChildren.sockets.forEach(socketEntry => {
    // socketEntry[1].ref is the reference to the listen socket
    listenSocketRefs.push(extractSocketInfo(socketEntry[1].ref));
  });

  return {
    ref: extractServerId(observable.ref),
    data: {
      calls_started: observableInfo.callTracker.callsStarted,
      calls_succeeded: observableInfo.callTracker.callsSucceeded,
      calls_failed: observableInfo.callTracker.callsFailed,
      last_call_started_timestamp: convertDateToTimestampObject(observableInfo.callTracker.lastCallStartedTimestamp),
      trace: observableInfo.trace.getTraceMessage()
    },
    listen_socket: listenSocketRefs
  };
}

module.exports = getObservableInfo;