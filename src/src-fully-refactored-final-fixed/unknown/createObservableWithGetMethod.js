/**
 * Combines an observable source and configuration with an optional subscription context,
 * returning an enhanced observable object that includes a 'get' method for value retrieval.
 *
 * @param {Object} sourceObservable - The main observable source object.
 * @param {Object} config - Configuration options for the observable.
 * @param {Object} [subscription] - Optional subscription object, may contain a 'value' property.
 * @returns {Object} An object combining the observable logic and a 'get' method for value access.
 */
function createObservableWithGetMethod(sourceObservable, config, subscription) {
  // Extract the value from the subscription if isBlobOrFileLikeObject exists, otherwise use an empty object
  const subscriptionValue = (subscription?.value !== undefined && subscription?.value !== null)
    ? subscription.value
    : {};

  // Merge the observable logic with a 'get' method for value retrieval
  return Object.assign(
    {},
    createEvaluationResult(sourceObservable, config, subscription, subscriptionValue),
    {
      // The 'get' method retrieves the current value from the observable
      get: createTypedConfigGetter(sourceObservable, subscription?.value)
    }
  );
}

module.exports = createObservableWithGetMethod;