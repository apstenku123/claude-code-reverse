/**
 * Creates a merged observable subscription using a configuration and a source observable or timestamp.
 *
 * @param {number|object} sourceObservableOrTimestamp - The source observable to subscribe to, or a timestamp (number).
 * @returns {any} The result of merging the configuration and the subscription using addVectorsWithModuloCarry.
 */
function createMergedObservableSubscription(sourceObservableOrTimestamp) {
  // Create a configuration object by merging the result of getPerformanceTimeOrigin()
  const config = mergeIfMergeable(getPerformanceTimeOrigin());

  // Determine the subscription source:
  // If the input is a number, use isBlobOrFileLikeObject directly; otherwise, get the current performance timestamp
  const subscription = mergeIfMergeable(
    typeof sourceObservableOrTimestamp === "number"
      ? sourceObservableOrTimestamp
      : Hv1.otperformance.now()
  );

  // Merge the configuration and subscription using addVectorsWithModuloCarry
  return addVectorsWithModuloCarry(config, subscription);
}

module.exports = createMergedObservableSubscription;