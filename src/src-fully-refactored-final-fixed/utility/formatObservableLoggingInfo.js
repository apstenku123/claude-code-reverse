/**
 * Formats logging information for a given observable source, including call statistics and listener socket references.
 *
 * @param {Object} sourceObservable - The observable source object to extract logging info from. Must implement getWorkingDirectoryInfo() and have a .ref property.
 * @returns {Object} An object containing the formatted reference, call statistics, trace message, and an array of formatted listener socket references.
 */
function formatObservableLoggingInfo(sourceObservable) {
  // Retrieve configuration and statistics from the observable
  const config = sourceObservable.getWorkingDirectoryInfo();

  // Collect formatted references to all listener sockets
  const listenerSocketReferences = [];
  config.listenerChildren.sockets.forEach(socketEntry => {
    // socketEntry[1].ref is the reference to the child socket
    listenerSocketReferences.push(extractSocketInfo(socketEntry[1].ref));
  });

  return {
    ref: extractServerId(sourceObservable.ref), // Format the observable'createInteractionAccessor reference
    data: {
      calls_started: config.callTracker.callsStarted,
      calls_succeeded: config.callTracker.callsSucceeded,
      calls_failed: config.callTracker.callsFailed,
      last_call_started_timestamp: convertDateToTimestampObject(config.callTracker.lastCallStartedTimestamp),
      trace: config.trace.getTraceMessage()
    },
    listen_socket: listenerSocketReferences
  };
}

module.exports = formatObservableLoggingInfo;