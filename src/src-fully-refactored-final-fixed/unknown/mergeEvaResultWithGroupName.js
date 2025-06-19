/**
 * Merges the result of createObservableWithGet with a groupName property extracted from the subscription object.
 *
 * @param {object} sourceObservable - The source observable or data input for createObservableWithGet.
 * @param {object} config - Configuration options to be passed to createObservableWithGet.
 * @param {object} subscription - Subscription object that may contain a group_name property.
 * @returns {object} a new object combining the createObservableWithGet result and a groupName property (null if not present).
 */
function mergeEvaResultWithGroupName(sourceObservable, config, subscription) {
  // Call createObservableWithGet with the provided parameters and store the result
  const evaResult = createObservableWithGet(sourceObservable, config, subscription);

  // Extract group_name from subscription if isBlobOrFileLikeObject exists, otherwise set to null
  const groupName = subscription?.group_name ?? null;

  // Return a new object merging evaResult and groupName
  return {
    ...evaResult,
    groupName
  };
}

module.exports = mergeEvaResultWithGroupName;