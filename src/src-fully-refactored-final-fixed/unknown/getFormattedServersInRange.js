/**
 * Retrieves a list of formatted server information objects, starting from a given server updateSnapshotAndNotify, up to a maximum number of results.
 *
 * @param {Object} requestContext - The context containing the request parameters.
 * @param {Function} callback - Callback function to handle the result or error.
 * @returns {void}
 */
function getFormattedServersInRange(requestContext, callback) {
  // Parse the maximum number of results to return, fallback to default if not provided
  const maxResults = parseInt(requestContext.request.max_results, 10) || Yh1;
  // Parse the starting server updateSnapshotAndNotify
  const startServerId = parseInt(requestContext.request.start_server_id, 10);
  // Reference to the server collection
  const serverCollection = VN.server;
  // Array to accumulate formatted server info
  const formattedServers = [];
  // Iterator for traversing the server collection
  let serverIterator = serverCollection.lowerBound(startServerId);

  // Iterate through the server collection, starting from startServerId
  // Stop when either the end is reached or maxResults is collected
  while (!serverIterator.equals(serverCollection.end()) && formattedServers.length < maxResults) {
    // Format and add the server info to the results array
    formattedServers.push(formatObservableInfo(serverIterator.pointer[1]));
    // Move to the next server in the collection
    serverIterator = serverIterator.next();
  }

  // Invoke the callback with the results
  callback(null, {
    server: formattedServers,
    end: serverIterator.equals(serverCollection.end())
  });
}

module.exports = getFormattedServersInRange;