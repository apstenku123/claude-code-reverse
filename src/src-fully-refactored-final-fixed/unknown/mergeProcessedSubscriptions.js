function mergeProcessedSubscriptions() {
  let mergedSubscriptions = {};

  // Iterate over each configuration in the global OM array
  for (const config of OM) {
    // Process the configuration to obtain a subscription object
    const processedSubscription = Jz(config);

    // Only merge if the processed subscription is truthy
    if (processedSubscription) {
      mergedSubscriptions = XE1(
        mergedSubscriptions,
        processedSubscription,
        (leftValue, rightValue) => {
          if (Array.isArray(leftValue) && Array.isArray(rightValue)) {
            return mergeUniqueElements(leftValue, rightValue);
          }
          // Otherwise, use default merging behavior (undefined return)
          return;
        }
      );
    }
  }

  return mergedSubscriptions;
}

module.exports = mergeProcessedSubscriptions;