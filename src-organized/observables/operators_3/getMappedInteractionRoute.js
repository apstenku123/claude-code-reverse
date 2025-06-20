/**
 * Retrieves the mapped interaction route for a given source observable.
 *
 * This accessor function returns the route name or associated metadata for the provided source observable,
 * as stored in the lI5 mapping. The mapping is maintained by the mapInteractionsToRoutes function.
 *
 * @param {string} sourceObservable - The key representing the source observable whose mapped route is to be retrieved.
 * @returns {*} The mapped route name or metadata associated with the given source observable, or undefined if not found.
 */
const getMappedInteractionRoute = (sourceObservable) => {
  // Access the lI5 mapping using the sourceObservable as the key
  return lI5[sourceObservable];
};

module.exports = getMappedInteractionRoute;
