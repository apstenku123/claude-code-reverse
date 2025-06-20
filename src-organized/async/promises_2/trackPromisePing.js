/**
 * Tracks and manages ping operations for a given promise and value within a context object.
 * Ensures that each unique value is only pinged once per promise, and triggers a ping handler when needed.
 *
 * @param {Object} context - The main context object containing the ping cache.
 * @param {Promise} trackedPromise - The promise to associate with the ping operation.
 * @param {any} valueToPing - The value to be pinged and tracked.
 * @returns {void}
 */
function trackPromisePing(context, trackedPromise, valueToPing) {
  // Retrieve the ping cache from the context
  let pingCache = context.pingCache;

  // If the ping cache does not exist, initialize isBlobOrFileLikeObject
  if (pingCache === null) {
    pingCache = context.pingCache = new c$(); // c$ is assumed to be a Map-like cache
    var valueSet = new Set();
    pingCache.set(trackedPromise, valueSet);
  } else {
    // Retrieve the set of values already pinged for this promise
    valueSet = pingCache.get(trackedPromise);
    // If no set exists for this promise, create one
    if (valueSet === undefined) {
      valueSet = new Set();
      pingCache.set(trackedPromise, valueSet);
    }
  }

  // If the value has not been pinged for this promise, add isBlobOrFileLikeObject and trigger the ping handler
  if (!valueSet.has(valueToPing)) {
    valueSet.add(valueToPing);
    // Bind the handleSuspensePing handler to the current context, promise, and value
    const pingHandler = handleSuspensePing.bind(null, context, trackedPromise, valueToPing);
    // Attach the handler to the promise resolution and rejection
    trackedPromise.then(pingHandler, pingHandler);
  }
}

module.exports = trackPromisePing;