/**
 * Determines whether two observables intersect based on a given subscription context.
 *
 * @param {any} sourceObservable - The first observable or interaction entry to check for intersection.
 * @param {any} targetObservable - The second observable or interaction entry to check for intersection.
 * @param {any} subscriptionContext - The context (e.g., random number generator or configuration) used for constructing the observables and intersection check.
 * @returns {boolean} True if the two observables intersect under the given context, false otherwise.
 */
const checkObservablesIntersection = (sourceObservable, targetObservable, subscriptionContext) => {
  // Wrap the source observable with Er0, using the subscription context
  const wrappedSource = new Er0(sourceObservable, subscriptionContext);
  // Wrap the target observable with Er0, using the subscription context
  const wrappedTarget = new Er0(targetObservable, subscriptionContext);
  // Check if the two wrapped observables intersect under the given context
  return wrappedSource.intersects(wrappedTarget, subscriptionContext);
};

module.exports = checkObservablesIntersection;
