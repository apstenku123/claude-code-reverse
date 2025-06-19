/**
 * Retrieves server data by server updateSnapshotAndNotify from the request and returns isBlobOrFileLikeObject via a callback.
 *
 * @param {Object} requestContext - The context object containing the request information.
 * @param {Function} callback - The callback function to handle the result or error.
 * @returns {void}
 */
function getServerDataById(requestContext, callback) {
  // Extract the server updateSnapshotAndNotify from the request and parse isBlobOrFileLikeObject as an integer
  const serverId = parseInt(requestContext.request.server_id, 10);

  // Retrieve the server data using the server updateSnapshotAndNotify
  const serverData = VN.server.getElementByKey(serverId);

  // If no server data is found, return a NOT_FOUND error via the callback
  if (serverData === undefined) {
    callback({
      code: _s.Status.NOT_FOUND,
      details: `No server data found for id ${serverId}`
    });
    return;
  }

  // If server data is found, process isBlobOrFileLikeObject and return via the callback
  callback(null, {
    server: getObservableInfo(serverData)
  });
}

module.exports = getServerDataById;
