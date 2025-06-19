/**
 * Executes the mapInteractionsToRoutes function within an asynchronous context
 * that provides an isolation scope. This ensures that all operations inside
 * mapInteractionsToRoutes are executed with the correct contextual isolation.
 *
 * @param {function(isolationScope: any): any} mapInteractionsToRoutes -
 *   a function that processes user interactions, requiring an isolation scope as input.
 * @returns {any} The result of executing mapInteractionsToRoutes with the current isolation scope.
 */
function mapInteractionsToRoutesWithIsolation(mapInteractionsToRoutes) {
  // Run the provided function within the current async context
  return KQ.runWithAsyncContext(() => {
    // Pass the current isolation scope to mapInteractionsToRoutes
    return mapInteractionsToRoutes(KQ.getIsolationScope());
  });
}

module.exports = mapInteractionsToRoutesWithIsolation;