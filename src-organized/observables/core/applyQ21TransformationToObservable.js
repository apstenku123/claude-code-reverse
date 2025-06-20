/**
 * Applies the Q21 transformation to each subscription of the given source observable using the provided configuration.
 *
 * @param {Observable} sourceObservable - The observable to which the transformation will be applied.
 * @param {Object} config - Configuration object passed to the D21 utility.
 * @returns {Observable} - a new observable with the Q21 transformation applied to each subscription.
 */
function applyQ21TransformationToObservable(sourceObservable, config) {
  // Use D21 utility to process the observable with a custom transformation function
  return D21(sourceObservable, config, function (originalObservable, subscription) {
    // Apply Q21 transformation to the subscription
    return Q21(sourceObservable, subscription);
  });
}

module.exports = applyQ21TransformationToObservable;