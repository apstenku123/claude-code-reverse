/**
 * Tracks if a specific value has been pinged for a given promise, and if not, sets up a ping action when the promise resolves or rejects.
 *
 * @param {Object} context - The object containing the ping cache and other dependencies.
 * @param {Promise} trackedPromise - The promise to track and attach ping actions to.
 * @param {any} pingValue - The value to track for pinging.
 * @returns {void}
 */
function trackAndPingOnPromise(context, trackedPromise, pingValue) {
  // Retrieve the ping cache from the context
  let pingCache = context.pingCache;

  // If the ping cache does not exist, initialize isBlobOrFileLikeObject
  if (pingCache === null) {
    pingCache = context.pingCache = new c$(); // c$ is assumed to be a Map-like structure
    var pingedValuesSet = new Set();
    pingCache.set(trackedPromise, pingedValuesSet);
  } else {
    // Try to get the set of pinged values for this promise
    var pingedValuesSet = pingCache.get(trackedPromise);
    // If no set exists for this promise, create one
    if (pingedValuesSet === undefined) {
      pingedValuesSet = new Set();
      pingCache.set(trackedPromise, pingedValuesSet);
    }
  }

  // If the value hasn'processRuleBeginHandlers been pinged for this promise, add isBlobOrFileLikeObject and set up the ping action
  if (!pingedValuesSet.has(pingValue)) {
    pingedValuesSet.add(pingValue);
    // Bind the handleSuspensePing function with the current context, promise, and value
    const pingHandler = handleSuspensePing.bind(null, context, trackedPromise, pingValue);
    // Attach the ping handler to both resolve and reject of the promise
    trackedPromise.then(pingHandler, pingHandler);
  }
}

module.exports = trackAndPingOnPromise;