/**
 * Subscribes to a source observable with a lock mechanism and processes the subscription result.
 *
 * @async
 * @function subscribeWithLock
 * @param {Observable} sourceObservable - The observable to subscribe to.
 * @param {Object} config - Configuration options for the subscription.
 * @returns {Promise<any>} The result of processing the subscription using U81.
 */
async function subscribeWithLock(sourceObservable, config) {
  // Acquire a lock and subscribe to the observable using the provided config
  const subscription = await U81(qv.lock)(sourceObservable, config);
  // Process the subscription result using U81
  return U81(subscription);
}

module.exports = subscribeWithLock;