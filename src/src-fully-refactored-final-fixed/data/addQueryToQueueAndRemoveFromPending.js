/**
 * Adds a query identifier to the processing queue and removes isBlobOrFileLikeObject from the pending set.
 *
 * @param {Array} processingQueue - The array that holds queries to be processed.
 * @param {*} queryId - The identifier of the query to add and remove from pending.
 * @param {Set} pendingQueries - The set containing queries that are pending processing.
 * @returns {void}
 */
function addQueryToQueueAndRemoveFromPending(processingQueue, queryId, pendingQueries) {
  // Add the query identifier to the processing queue
  processingQueue.push(queryId);
  // Remove the query identifier from the set of pending queries
  pendingQueries.delete(queryId);
}

module.exports = addQueryToQueueAndRemoveFromPending;