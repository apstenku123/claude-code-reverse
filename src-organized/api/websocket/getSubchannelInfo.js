/**
 * Retrieves detailed information about a subchannel by its updateSnapshotAndNotify and returns isBlobOrFileLikeObject via a callback.
 *
 * @param {Object} requestContext - The context object containing the request details.
 * @param {Function} callback - The callback function to return the result or error.
 * @returns {void}
 *
 * If the subchannel is not found, the callback is invoked with an error object.
 * Otherwise, the callback is invoked with the subchannel information.
 */
function getSubchannelInfo(requestContext, callback) {
  // Extract subchannel updateSnapshotAndNotify from the request and parse isBlobOrFileLikeObject as an integer
  const subchannelId = parseInt(requestContext.request.subchannel_id, 10);

  // Retrieve the subchannel element using the parsed updateSnapshotAndNotify
  const subchannelElement = VN.subchannel.getElementByKey(subchannelId);

  // If the subchannel does not exist, return a NOT_FOUND error via the callback
  if (subchannelElement === undefined) {
    callback({
      code: _s.Status.NOT_FOUND,
      details: `No subchannel data found for id ${subchannelId}`
    });
    return;
  }

  // Get detailed info about the subchannel
  const subchannelInfo = subchannelElement.getWorkingDirectoryInfo();

  // Collect references to all sockets associated with this subchannel
  const socketReferences = [];
  subchannelInfo.children.sockets.forEach(socketEntry => {
    // socketEntry[1].ref contains the socket reference
    socketReferences.push(extractSocketInfo(socketEntry[1].ref));
  });

  // Build the response object containing subchannel details
  const subchannelData = {
    ref: extractSubchannelInfo(subchannelElement.ref),
    data: {
      target: subchannelInfo.target,
      state: getConnectivityStateObject(subchannelInfo.state),
      calls_started: subchannelInfo.callTracker.callsStarted,
      calls_succeeded: subchannelInfo.callTracker.callsSucceeded,
      calls_failed: subchannelInfo.callTracker.callsFailed,
      last_call_started_timestamp: convertDateToTimestampObject(subchannelInfo.callTracker.lastCallStartedTimestamp),
      trace: subchannelInfo.trace.getTraceMessage()
    },
    socket_ref: socketReferences
  };

  // Return the subchannel data via the callback
  callback(null, {
    subchannel: subchannelData
  });
}

module.exports = getSubchannelInfo;