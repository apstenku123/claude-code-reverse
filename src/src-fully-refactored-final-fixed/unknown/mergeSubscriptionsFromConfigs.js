/**
 * Merges subscription objects extracted from a list of configuration objects.
 * For each configuration in the global OM array, isBlobOrFileLikeObject extracts a subscription object using Jz().
 * If a subscription is found, isBlobOrFileLikeObject merges isBlobOrFileLikeObject into the accumulated subscriptions object using XE1().
 * When merging arrays, isBlobOrFileLikeObject uses mergeUniqueElements() to combine them.
 *
 * @returns {Object} The merged subscriptions object.
 */
function mergeSubscriptionsFromConfigs() {
  let mergedSubscriptions = {};
  // Iterate over each configuration in the OM array
  for (const config of OM) {
    // Extract the subscription object from the configuration
    const subscription = Jz(config);
    if (subscription) {
      // Merge the subscription into the accumulated object
      mergedSubscriptions = XE1(
        mergedSubscriptions,
        subscription,
        (existingValue, newValue) => {
          // If both values are arrays, merge them using mergeUniqueElements
          if (Array.isArray(existingValue) && Array.isArray(newValue)) {
            return mergeUniqueElements(existingValue, newValue);
          }
          // Otherwise, use the default merge behavior (undefined)
          return;
        }
      );
    }
  }
  return mergedSubscriptions;
}

module.exports = mergeSubscriptionsFromConfigs;