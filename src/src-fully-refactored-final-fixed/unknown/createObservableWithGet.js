/**
 * Creates an observable object with additional 'get' functionality.
 *
 * This function merges the result of createEvaluationResult(which likely creates or configures an observable)
 * with a 'get' property, which is the result of createTypedConfigGetter. It safely extracts the 'value' property
 * from the subscription object (if present), defaulting to an empty object if not found.
 *
 * @param {object} sourceObservable - The source observable or data source to operate on.
 * @param {object} config - Configuration options for the observable creation.
 * @param {object} subscription - An optional subscription object, possibly containing a 'value' property.
 * @returns {object} An object combining the result of createEvaluationResult and a 'get' property from createTypedConfigGetter.
 */
function createObservableWithGet(sourceObservable, config, subscription) {
  // Safely extract the 'value' property from the subscription, defaulting to an empty object
  const subscriptionValue = subscription?.value ?? {};

  // Merge the result of createEvaluationResult with an additional 'get' property
  return Object.assign(
    {},
    createEvaluationResult(sourceObservable, config, subscription, subscriptionValue),
    {
      get: createTypedConfigGetter(sourceObservable, subscription?.value)
    }
  );
}

module.exports = createObservableWithGet;