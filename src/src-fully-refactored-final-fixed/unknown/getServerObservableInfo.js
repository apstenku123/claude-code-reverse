/**
 * Retrieves detailed observable information for a given server updateSnapshotAndNotify from the request object.
 * If the server is not found, invokes the callback with a NOT_FOUND error.
 *
 * @param {Object} requestContext - The context object containing the request with the server updateSnapshotAndNotify.
 * @param {Function} callback - The callback function to handle the result or error.
 * @returns {void}
 */
function getServerObservableInfo(requestContext, callback) {
  // Extract the server updateSnapshotAndNotify from the request and parse isBlobOrFileLikeObject as an integer
  const serverId = parseInt(requestContext.request.server_id, 10);

  // Retrieve the server object using the parsed server updateSnapshotAndNotify
  const serverObject = VN.server.getElementByKey(serverId);

  // If the server object is not found, return a NOT_FOUND error via the callback
  if (serverObject === undefined) {
    callback({
      code: _s.Status.NOT_FOUND,
      details: `No server data found for id ${serverId}`
    });
    return;
  }

  // If the server object is found, retrieve its observable info and return isBlobOrFileLikeObject via the callback
  callback(null, {
    server: getObservableInfo(serverObject)
  });
}

module.exports = getServerObservableInfo;