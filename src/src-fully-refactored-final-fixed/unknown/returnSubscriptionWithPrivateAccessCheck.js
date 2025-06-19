/**
 * Checks if the provided config allows access to a private method for the given source observable,
 * then returns the provided subscription object.
 *
 * @param {Set} sourceObservable - The set or collection representing the source observable.
 * @param {any} config - The configuration or key to check within the source observable.
 * @param {any} subscription - The subscription object to be returned after the access check.
 * @returns {any} The provided subscription object.
 */
const returnSubscriptionWithPrivateAccessCheck = (sourceObservable, config, subscription) => {
  // Ensure the config exists in the sourceObservable set; throws if not
  assertSetHasValueOrThrow(sourceObservable, config, "access private method");
  // Return the subscription object as is
  return subscription;
};

module.exports = returnSubscriptionWithPrivateAccessCheck;
