/**
 * Retrieves server information by server updateSnapshotAndNotify from the request object and returns formatted server data.
 *
 * @function getServerInfoById
 * @param {Object} requestContext - The context object containing the request with a server_id.
 * @param {Function} callback - Callback function to handle the result or error.
 * @returns {void}
 */
function getServerInfoById(requestContext, callback) {
  // Extract and parse the server updateSnapshotAndNotify from the request
  const serverId = parseInt(requestContext.request.server_id, 10);
  // Retrieve the server object using the server updateSnapshotAndNotify
  const serverData = VN.server.getElementByKey(serverId);

  // If server data is not found, return a NOT_FOUND error via the callback
  if (serverData === undefined) {
    callback({
      code: _s.Status.NOT_FOUND,
      details: `No server data found for id ${serverId}`
    });
    return;
  }

  // If server data is found, format and return isBlobOrFileLikeObject via the callback
  callback(null, {
    server: getObservableInfo(serverData)
  });
}

module.exports = getServerInfoById;