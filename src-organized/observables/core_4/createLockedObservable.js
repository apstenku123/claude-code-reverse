/**
 * Creates a locked observable by applying a lock operator to the source observable
 * with the provided configuration, then processes the result with a handler.
 *
 * @param {Observable} sourceObservable - The source observable to be locked.
 * @param {Object} config - Configuration object for the lock operator.
 * @returns {any} The result of processing the locked observable with the handler.
 */
function createLockedObservable(sourceObservable, config) {
  // Apply the lock operator to the source observable with the processed config
  const lockedObservable = N81(qv.lock)(sourceObservable, OT1(config));
  // Process the locked observable with the N81 handler
  return N81(lockedObservable);
}

module.exports = createLockedObservable;
