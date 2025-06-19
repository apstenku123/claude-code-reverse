/**
 * Validates access to a private method and returns the provided subscription.
 *
 * @param {object} sourceObservable - The observable or object to check access on.
 * @param {object} config - Configuration or context for the access check.
 * @param {any} subscription - The subscription or value to return after validation.
 * @returns {any} Returns the provided subscription after validating access.
 */
const validatePrivateMethodAccessAndReturnSubscription = (sourceObservable, config, subscription) => {
  // Validate that the private method can be accessed
  Yl1(sourceObservable, config, "access private method");
  // Return the subscription as is
  return subscription;
};

module.exports = validatePrivateMethodAccessAndReturnSubscription;
