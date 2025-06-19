/**
 * Validates access to a private method and returns the provided subscription object.
 *
 * @function validateAccessAndReturnSubscription
 * @param {Set<any>} sourceObservable - The set or collection to check for access rights.
 * @param {any} config - Configuration or context used for access validation.
 * @param {any} subscription - The subscription object to return if access is valid.
 * @returns {any} The original subscription object if access is validated.
 *
 * @throws {TypeError} Throws if access validation fails.
 */
const validateAccessAndReturnSubscription = (sourceObservable, config, subscription) => {
  // Assert that the sourceObservable and config allow access to the private method
  assertSetHasValueOrThrow(sourceObservable, config, "access private method");
  // Return the subscription object as is
  return subscription;
};

module.exports = validateAccessAndReturnSubscription;
