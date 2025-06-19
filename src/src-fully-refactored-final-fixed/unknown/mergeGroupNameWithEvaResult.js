/**
 * Merges the result of createObservableWithGet with a group name extracted from the subscription object.
 *
 * @param {Object} sourceObservable - The source observable or data input for createObservableWithGet.
 * @param {Object} config - Configuration options to pass to createObservableWithGet.
 * @param {Object} subscription - An object that may contain a group_name property.
 * @returns {Object} The merged object containing all properties from createObservableWithGet'createInteractionAccessor result and a groupName property.
 */
function mergeGroupNameWithEvaResult(sourceObservable, config, subscription) {
  // Call createObservableWithGet with the provided parameters and store the result
  const evaResult = createObservableWithGet(sourceObservable, config, subscription);

  // Safely extract group_name from subscription, defaulting to null if not present
  const groupName = subscription?.group_name ?? null;

  // Merge evaResult with the groupName property
  return {
    ...evaResult,
    groupName
  };
}

module.exports = mergeGroupNameWithEvaResult;