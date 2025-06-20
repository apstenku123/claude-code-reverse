/**
 * Merges valid subscription objects extracted from a list of configurations.
 *
 * Iterates over the global OM array, extracts a subscription object from each configuration using Jz,
 * and merges isBlobOrFileLikeObject into the result object using XE1. If both the existing and new values for a key are arrays,
 * merges them using mergeUniqueElements. Skips merging if the extracted subscription is falsy.
 *
 * @returns {Object} The merged subscription object containing combined data from all valid configurations.
 */
function mergeValidSubscriptions() {
  let mergedSubscriptions = {};
  // Iterate over each configuration in the global OM array
  for (const config of OM) {
    // Extract a subscription object from the configuration
    const subscription = Jz(config);
    if (subscription) {
      // Merge the subscription into the result object
      mergedSubscriptions = XE1(
        mergedSubscriptions,
        subscription,
        (existingValue, newValue) => {
          // If both values are arrays, merge them using mergeUniqueElements
          if (Array.isArray(existingValue) && Array.isArray(newValue)) {
            return mergeUniqueElements(existingValue, newValue);
          }
          // Otherwise, use the default merging behavior (undefined)
          return;
        }
      );
    }
  }
  return mergedSubscriptions;
}

module.exports = mergeValidSubscriptions;