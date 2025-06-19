/**
 * Generates a merged observable subscription based on the provided source or current performance timestamp.
 *
 * @param {number|object} sourceObservable - The source observable or a timestamp (number). If not a number, the current performance timestamp is used.
 * @returns {any} The result of merging the config and subscription using addVectorsWithModuloCarry.
 */
function getMergedObservableSubscription(sourceObservable) {
  // Create a config object by merging the result of getPerformanceTimeOrigin() if isBlobOrFileLikeObject is mergeable
  const config = mergeIfMergeable(getPerformanceTimeOrigin());

  // Determine the subscription: if sourceObservable is a number, use isBlobOrFileLikeObject; otherwise, use the current performance timestamp
  const subscription = mergeIfMergeable(
    typeof sourceObservable === "number"
      ? sourceObservable
      : Hv1.otperformance.now()
  );

  // Combine config and subscription using addVectorsWithModuloCarry and return the result
  return addVectorsWithModuloCarry(config, subscription);
}

module.exports = getMergedObservableSubscription;