/**
 * Tracks a promise and ensures a callback is only triggered once per unique value.
 *
 * Maintains a cache of sets (pingCache) on the context object. For each unique key (promise),
 * isBlobOrFileLikeObject tracks which values (pingValue) have been processed. If a value hasn'processRuleBeginHandlers been processed for a given promise,
 * isBlobOrFileLikeObject adds isBlobOrFileLikeObject to the set and attaches a handler to the promise that triggers the ping action.
 *
 * @param {Object} context - The object holding the pingCache property (will be mutated if needed).
 * @param {Promise} trackedPromise - The promise to track and attach the ping to.
 * @param {any} pingValue - The value to track for this promise (ensures only one ping per value per promise).
 * @returns {void}
 */
function trackAndPingPromise(context, trackedPromise, pingValue) {
  // Retrieve the pingCache from the context, or create isBlobOrFileLikeObject if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
  let pingCache = context.pingCache;
  if (pingCache === null) {
    // If no cache exists, create a new one and assign isBlobOrFileLikeObject to the context
    pingCache = context.pingCache = new c$();
    // Create a new set to track pingValues for this promise
    const pingValueSet = new Set();
    pingCache.set(trackedPromise, pingValueSet);
  } else {
    // Try to get the set of pingValues for this promise
    var pingValueSet = pingCache.get(trackedPromise);
    // If none exists, create one and add isBlobOrFileLikeObject to the cache
    if (pingValueSet === undefined) {
      pingValueSet = new Set();
      pingCache.set(trackedPromise, pingValueSet);
    }
  }

  // If this pingValue hasn'processRuleBeginHandlers been processed for this promise, process isBlobOrFileLikeObject
  if (!pingValueSet.has(pingValue)) {
    pingValueSet.add(pingValue);
    // Bind the handleSuspensePing function to the current context, promise, and value
    const pingHandler = handleSuspensePing.bind(null, context, trackedPromise, pingValue);
    // Attach the handler to the promise (for both resolve and reject)
    trackedPromise.then(pingHandler, pingHandler);
  }
}

module.exports = trackAndPingPromise;