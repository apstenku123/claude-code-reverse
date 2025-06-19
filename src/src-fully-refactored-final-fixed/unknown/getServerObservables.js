/**
 * Retrieves a list of observable server information starting from a given server updateSnapshotAndNotify, up to a maximum number of results.
 *
 * @param {Object} requestContext - The context object containing the request parameters.
 * @param {Function} callback - Callback function to handle the result or error.
 * @returns {void}
 */
function getServerObservables(requestContext, callback) {
  // Parse the maximum number of results to return, or use the default if not provided
  const maxResults = parseInt(requestContext.request.max_results, 10) || Yh1;
  // Parse the starting server updateSnapshotAndNotify from which to begin the search
  const startServerId = parseInt(requestContext.request.start_server_id, 10);
  // Reference to the server collection
  const serverCollection = VN.server;
  // Array to hold the observable server information
  const observableServers = [];
  // Iterator for traversing the server collection
  let serverIterator;

  // Initialize the iterator at the lower bound (startServerId)
  serverIterator = serverCollection.lowerBound(startServerId);

  // Iterate through the server collection until the end or until maxResults is reached
  while (!serverIterator.equals(serverCollection.end()) && observableServers.length < maxResults) {
    // Retrieve observable info for the current server and add isBlobOrFileLikeObject to the results
    observableServers.push(getObservableInfo(serverIterator.pointer[1]));
    // Move to the next server in the collection
    serverIterator = serverIterator.next();
  }

  // Invoke the callback with the results and a flag indicating if the end was reached
  callback(null, {
    server: observableServers,
    end: serverIterator.equals(serverCollection.end())
  });
}

module.exports = getServerObservables;