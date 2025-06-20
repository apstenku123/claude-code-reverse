/**
 * Creates a descriptor object for a group value, combining base metadata, current value, and group information.
 *
 * @param {Observable} sourceObservable - The source observable or data stream.
 * @param {Object} config - Configuration object for the group/value.
 * @param {Object} subscription - Subscription object containing value and group name.
 * @param {any} context - Additional context or identifier for the value.
 * @returns {Object} Descriptor object containing merged metadata, value getter, group name, and raw value.
 */
function createGroupValueDescriptor(sourceObservable, config, subscription, context) {
  // Merge base metadata from createEvaluationResult with additional properties
  return Object.assign(
    {},
    createEvaluationResult(sourceObservable, config, subscription, undefined),
    {
      // Getter for the current value, using createTypedConfigGetter utility
      get: createTypedConfigGetter(
        sourceObservable,
        subscription?.value,
        context
      ),
      // Group name, or null if not present
      groupName: subscription?.group_name ?? null,
      // Raw value, or empty object if not present
      __value: subscription?.value ?? {}
    }
  );
}

module.exports = createGroupValueDescriptor;