/**
 * Waits for the provided observable to become ready using the given configuration and subscription.
 *
 * @param {Object} sourceObservable - The observable object that exposes a waitForReady method.
 * @param {Object} config - Configuration options to control the readiness check.
 * @param {Object} subscription - The subscription or context required for readiness.
 * @returns {Promise<any>} Resolves when the observable is ready, as determined by the waitForReady method.
 */
const waitForObservableReady = (sourceObservable, config, subscription) => {
  // Delegate readiness check to the observable'createInteractionAccessor waitForReady method
  return sourceObservable.waitForReady(config, subscription);
};

module.exports = waitForObservableReady;
