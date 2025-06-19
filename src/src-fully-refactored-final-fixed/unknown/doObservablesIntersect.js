/**
 * Determines whether two observables intersect, given a subscription context.
 *
 * @param {any} firstObservable - The first observable or data source to compare.
 * @param {any} secondObservable - The second observable or data source to compare.
 * @param {any} subscriptionContext - The context or configuration used for both observables and their intersection check.
 * @returns {boolean} True if the two observables intersect under the given context; otherwise, false.
 */
const doObservablesIntersect = (firstObservable, secondObservable, subscriptionContext) => {
  // Wrap the first observable with the Er0 class, using the subscription context
  const wrappedFirstObservable = new Er0(firstObservable, subscriptionContext);
  // Wrap the second observable with the Er0 class, using the subscription context
  const wrappedSecondObservable = new Er0(secondObservable, subscriptionContext);
  // Check if the two wrapped observables intersect, passing the context
  return wrappedFirstObservable.intersects(wrappedSecondObservable, subscriptionContext);
};

module.exports = doObservablesIntersect;
