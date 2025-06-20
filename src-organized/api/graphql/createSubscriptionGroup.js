/**
 * Combines subscription configuration, group name, and value into a single object.
 *
 * @param {Observable} sourceObservable - The source observable to subscribe to.
 * @param {Object} config - Configuration options for the subscription.
 * @param {Object} subscription - Subscription details, may include value and group_name.
 * @param {any} context - Additional context for the subscription (passed to createTypedConfigGetter).
 * @returns {Object} An object containing merged subscription config, getter, group name, and value.
 */
function createSubscriptionGroup(sourceObservable, config, subscription, context) {
  // Merge the base subscription configuration
  const mergedConfig = createEvaluationResult(sourceObservable, config, subscription, undefined);

  // Safely extract group name from subscription, default to null if not present
  const groupName = subscription?.group_name ?? null;

  // Safely extract value from subscription, default to empty object if not present
  const value = subscription?.value ?? {};

  // Create a getter using createTypedConfigGetter with the source observable, value, and context
  const getter = createTypedConfigGetter(sourceObservable, subscription?.value, context);

  // Combine all properties into a single object
  return Object.assign(
    {},
    mergedConfig,
    {
      get: getter,
      groupName: groupName,
      __value: value
    }
  );
}

module.exports = createSubscriptionGroup;
