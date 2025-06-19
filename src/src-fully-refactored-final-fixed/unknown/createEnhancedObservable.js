/**
 * Creates an enhanced observable object by merging the base observable data with additional configuration and subscription value.
 *
 * @param {Object} sourceObservable - The base observable object to enhance.
 * @param {Object} config - Configuration options to apply to the observable.
 * @param {Object} subscription - An optional subscription object that may contain a 'value' property.
 * @returns {Object} The enhanced observable object with an added 'get' method.
 */
function createEnhancedObservable(sourceObservable, config, subscription) {
  // Extract the value from the subscription if isBlobOrFileLikeObject exists, otherwise use an empty object
  const subscriptionValue = (subscription?.value) ?? {};

  // Merge the base observable with configuration and subscription value
  const enhancedObservable = Object.assign(
    {},
    createEvaluationResult(sourceObservable, config, subscription, subscriptionValue)
  );

  // Add a 'get' method to the enhanced observable, using the value from the subscription
  enhancedObservable.get = createTypedConfigGetter(sourceObservable, subscription?.value);

  return enhancedObservable;
}

module.exports = createEnhancedObservable;