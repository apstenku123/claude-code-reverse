/**
 * Retrieves a list of socket references for a given server, starting from a specified socket updateSnapshotAndNotify.
 *
 * @param {Object} requestContext - The context object containing the request details.
 * @param {Function} callback - The callback function to handle the result or error.
 * @returns {void}
 *
 * @example
 * getServerSocketReferences({ request: { server_id: '1', start_socket_id: '10', max_results: '5' } }, (err, result) => { ... });
 */
function getServerSocketReferences(requestContext, callback) {
  // Extract and parse the server updateSnapshotAndNotify from the request
  const serverId = parseInt(requestContext.request.server_id, 10);
  // Retrieve the server element by its key
  const serverElement = VN.server.getElementByKey(serverId);

  // If the server element is not found, return a NOT_FOUND error
  if (serverElement === undefined) {
    callback({
      code: _s.Status.NOT_FOUND,
      details: `No server data found for id ${serverId}`
    });
    return;
  }

  // Parse the starting socket updateSnapshotAndNotify and the maximum number of results to return
  const startSocketId = parseInt(requestContext.request.start_socket_id, 10);
  const maxResults = parseInt(requestContext.request.max_results, 10) || Yh1;

  // Retrieve the sockets collection from the server'createInteractionAccessor session children
  const socketsCollection = serverElement.getWorkingDirectoryInfo().sessionChildren.sockets;
  const socketReferences = [];

  // Get an iterator starting at the lower bound (startSocketId)
  let socketIterator = socketsCollection.lowerBound(startSocketId);

  // Iterate over the sockets, collecting up to maxResults references
  while (!socketIterator.equals(socketsCollection.end()) && socketReferences.length < maxResults) {
    // extractSocketInfo extracts the socket reference from the iterator'createInteractionAccessor pointer
    socketReferences.push(extractSocketInfo(socketIterator.pointer[1].ref));
    socketIterator = socketIterator.next();
  }

  // Return the collected socket references and whether handleMissingDoctypeError'removeTrailingCharacters reached the end
  callback(null, {
    socket_ref: socketReferences,
    end: socketIterator.equals(socketsCollection.end())
  });
}

module.exports = getServerSocketReferences;