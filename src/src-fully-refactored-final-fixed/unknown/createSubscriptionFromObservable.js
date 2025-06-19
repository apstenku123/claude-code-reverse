/**
 * Creates a subscription object from an observable source and configuration.
 *
 * This function processes the body of the given observable source using the provided configuration,
 * then merges the result of a transformation function into a new subscription object.
 *
 * @async
 * @param {Object} sourceObservable - The observable source containing a 'body' property.
 * @param {Object} config - Configuration options for processing and transformation.
 * @returns {Promise<Object>} The resulting subscription object after merging transformations.
 */
async function createSubscriptionFromObservable(sourceObservable, config) {
  // Initialize an empty subscription object
  const subscription = {};

  // Process the observable'createInteractionAccessor body with the given config (possibly asynchronous)
  const processedBody = await mt(sourceObservable.body, config);

  // Transform the processed body and merge the result into the subscription object
  Object.assign(subscription, lr6(processedBody, config));

  // Return the final subscription object
  return subscription;
}

module.exports = createSubscriptionFromObservable;
