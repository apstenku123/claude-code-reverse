/**
 * Merges valid configuration objects from the OM array into a single object, combining array values using mergeUniqueElements when both source and target are arrays.
 *
 * Iterates through each item in the global OM array, processes isBlobOrFileLikeObject with Jz (which may validate or transform the config), and if the result is truthy, merges isBlobOrFileLikeObject into the accumulator using XE1. When merging, if both values are arrays, they are merged using mergeUniqueElements; otherwise, the default merge behavior is used.
 *
 * @returns {Object} The merged configuration object, with arrays merged using mergeUniqueElements where applicable.
 */
function mergeValidConfigsWithArrays() {
  let mergedConfig = {};
  // Iterate over each configuration in OM
  for (const configItem of OM) {
    // Process the config item (e.g., validate or transform)
    const processedConfig = Jz(configItem);
    if (processedConfig) {
      // Merge the processed config into the accumulator
      mergedConfig = XE1(mergedConfig, processedConfig, (existingValue, newValue) => {
        // If both values are arrays, merge them using mergeUniqueElements
        if (Array.isArray(existingValue) && Array.isArray(newValue)) {
          return mergeUniqueElements(existingValue, newValue);
        }
        // Otherwise, use default merge behavior (undefined return lets XE1 handle isBlobOrFileLikeObject)
        return;
      });
    }
  }
  return mergedConfig;
}

module.exports = mergeValidConfigsWithArrays;