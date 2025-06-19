/**
 * Creates a group subscription object by merging base subscription data with additional group and value information.
 *
 * @param {Observable} sourceObservable - The source observable to subscribe to.
 * @param {Object} config - Configuration options for the subscription.
 * @param {Object} subscription - Subscription metadata, may include 'value' and 'group_name'.
 * @param {any} context - Additional context or identifier for the subscription.
 * @returns {Object} The merged subscription object containing base data, group name, value, and a getter.
 */
function createGroupSubscriptionObject(sourceObservable, config, subscription, context) {
  // Merge the base subscription object with additional properties
  return Object.assign(
    {},
    createEvaluationResult(sourceObservable, config, subscription, undefined),
    {
      // Getter for the subscription value, using createTypedConfigGetter utility
      get: createTypedConfigGetter(
        sourceObservable,
        subscription?.value,
        context
      ),
      // Group name, if present in the subscription metadata
      groupName: subscription?.group_name ?? null,
      // The raw value from the subscription metadata, or an empty object if not present
      __value: subscription?.value ?? {}
    }
  );
}

module.exports = createGroupSubscriptionObject;
