/**
 * Creates a merged subscription object based on the provided source observable or timestamp.
 *
 * If the input is a number, isBlobOrFileLikeObject is used directly as the timestamp. Otherwise, the current performance time is used.
 * The function merges configuration and subscription objects using the mergeIfMergeable utility, and then passes them to addVectorsWithModuloCarry.
 *
 * @param {number|object} sourceObservable - The source observable or a timestamp number.
 * @returns {any} The result of merging the config and subscription, as processed by addVectorsWithModuloCarry.
 */
function createMergedSubscription(sourceObservable) {
  // Merge the default configuration object returned by getPerformanceTimeOrigin()
  const config = mergeIfMergeable(getPerformanceTimeOrigin());

  // Determine the timestamp: use the input if isBlobOrFileLikeObject'createInteractionAccessor a number, otherwise use the current performance time
  const timestamp = typeof sourceObservable === "number"
    ? sourceObservable
    : Hv1.otperformance.now();

  // Merge the timestamp into a subscription object
  const subscription = mergeIfMergeable(timestamp);

  // Combine the config and subscription using addVectorsWithModuloCarry and return the result
  return addVectorsWithModuloCarry(config, subscription);
}

module.exports = createMergedSubscription;