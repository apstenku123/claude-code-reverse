/**
 * Retrieves a paginated list of servers starting from a given server updateSnapshotAndNotify.
 *
 * @param {Object} requestContext - The context containing the request parameters.
 * @param {Function} callback - Callback function to handle the result or error.
 * @returns {void}
 *
 * The function parses the maximum number of results and the starting server updateSnapshotAndNotify from the request context,
 * iterates over the server collection starting from the specified server updateSnapshotAndNotify, collects up to the maximum number
 * of servers, formats each server'createInteractionAccessor information, and returns the result via the callback.
 */
function getServerListWithPagination(requestContext, callback) {
  // Parse the maximum number of results to return; use default if not provided
  const maxResults = parseInt(requestContext.request.max_results, 10) || Yh1;
  // Parse the starting server updateSnapshotAndNotify
  const startServerId = parseInt(requestContext.request.start_server_id, 10);
  // Reference to the server collection
  const serverCollection = VN.server;
  // Array to hold the formatted server information
  const serverList = [];
  // Iterator for traversing the server collection
  let serverIterator = serverCollection.lowerBound(startServerId);

  // Iterate through the server collection, collecting up to maxResults servers
  while (!serverIterator.equals(serverCollection.end()) && serverList.length < maxResults) {
    // Format and add the current server'createInteractionAccessor information to the list
    serverList.push(formatObservableInfo(serverIterator.pointer[1]));
    // Move to the next server in the collection
    serverIterator = serverIterator.next();
  }

  // Return the collected server list and whether handleMissingDoctypeError'removeTrailingCharacters reached the end of the collection
  callback(null, {
    server: serverList,
    end: serverIterator.equals(serverCollection.end())
  });
}

module.exports = getServerListWithPagination;