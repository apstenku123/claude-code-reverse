/**
 * Creates a function that combines two observables: one from the provided input and one transformed by a mapping function.
 *
 * @param {any} sourceObservable - The original observable or source to be transformed.
 * @returns {function} - a function that takes a subscription, an input observable, and an optional context, then combines the input and transformed observables.
 */
function createTransformedObservableCombiner(sourceObservable) {
  /**
   * Combines the input observable with a transformed version of the source observable.
   *
   * @param {any} subscription - The subscription or context for the observable operation.
   * @param {any} inputObservable - The observable to be combined with the transformed source.
   * @param {any} [context] - Optional context or additional argument for the transformation.
   * @returns {any} - The result of combining the two observables.
   */
  return function combineObservables(subscription, inputObservable, context) {
    // Transform the source observable using createHmacBase64Hasher with the provided subscription and context
    const transformedObservable = createHmacBase64Hasher(sourceObservable)(subscription, context);
    // Convert both input and transformed observables using Ed.from, then combine them with rA5
    return rA5(Ed.from(inputObservable), Ed.from(transformedObservable));
  };
}

module.exports = createTransformedObservableCombiner;