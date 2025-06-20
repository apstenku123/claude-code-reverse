/**
 * Retrieves detailed information about a socket by its updateSnapshotAndNotify, including security and statistics.
 *
 * @param {Object} requestObject - The request object containing the socket_id in requestObject.request.socket_id
 * @param {Function} callback - Callback function to handle the result or error
 * @returns {void}
 */
function getSocketInfoById(requestObject, callback) {
  // Parse the socket updateSnapshotAndNotify from the request object
  const socketId = parseInt(requestObject.request.socket_id, 10);
  // Retrieve the socket instance using the socket updateSnapshotAndNotify
  const socketInstance = VN.socket.getElementByKey(socketId);

  // If the socket instance is not found, return a NOT_FOUND error via callback
  if (socketInstance === undefined) {
    callback({
      code: _s.Status.NOT_FOUND,
      details: `No socket data found for id ${socketId}`
    });
    return;
  }

  // Retrieve socket information
  const socketInfo = socketInstance.getWorkingDirectoryInfo();

  // Prepare security details if available
  let securityDetails = null;
  if (socketInfo.security) {
    securityDetails = {
      model: "tls",
      tls: {
        cipher_suite: socketInfo.security.cipherSuiteStandardName ? "standard_name" : "other_name",
        standard_name: socketInfo.security.cipherSuiteStandardName ?? undefined,
        other_name: socketInfo.security.cipherSuiteOtherName ?? undefined,
        local_certificate: socketInfo.security.localCertificate ?? undefined,
        remote_certificate: socketInfo.security.remoteCertificate ?? undefined
      }
    };
  }

  // Construct the response object with all relevant socket details
  const socketDetails = {
    ref: extractSocketInfo(socketInstance.ref),
    local: socketInfo.localAddress ? formatSubchannelAddress(socketInfo.localAddress) : null,
    remote: socketInfo.remoteAddress ? formatSubchannelAddress(socketInfo.remoteAddress) : null,
    remote_name: socketInfo.remoteName ?? undefined,
    security: securityDetails,
    data: {
      keep_alives_sent: socketInfo.keepAlivesSent,
      streams_started: socketInfo.streamsStarted,
      streams_succeeded: socketInfo.streamsSucceeded,
      streams_failed: socketInfo.streamsFailed,
      last_local_stream_created_timestamp: convertDateToTimestampObject(socketInfo.lastLocalStreamCreatedTimestamp),
      last_remote_stream_created_timestamp: convertDateToTimestampObject(socketInfo.lastRemoteStreamCreatedTimestamp),
      messages_received: socketInfo.messagesReceived,
      messages_sent: socketInfo.messagesSent,
      last_message_received_timestamp: convertDateToTimestampObject(socketInfo.lastMessageReceivedTimestamp),
      last_message_sent_timestamp: convertDateToTimestampObject(socketInfo.lastMessageSentTimestamp),
      local_flow_control_window: socketInfo.localFlowControlWindow ? { value: socketInfo.localFlowControlWindow } : null,
      remote_flow_control_window: socketInfo.remoteFlowControlWindow ? { value: socketInfo.remoteFlowControlWindow } : null
    }
  };

  // Return the socket details via callback
  callback(null, { socket: socketDetails });
}

module.exports = getSocketInfoById;