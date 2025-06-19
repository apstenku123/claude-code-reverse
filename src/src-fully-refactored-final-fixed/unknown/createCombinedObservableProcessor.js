/**
 * Creates a processor function that combines an input observable with a derived observable
 * and processes them using a provided combining function.
 *
 * @param {any} sourceObservable - The source observable or configuration for deriving an observable.
 * @returns {function} a function that takes a subscription, an input observable, and a context,
 *                     then combines and processes them.
 */
function createCombinedObservableProcessor(sourceObservable) {
  /**
   * Processes the input observable and a derived observable, then combines them.
   *
   * @param {any} subscription - The current subscription or observer.
   * @param {any} inputObservable - The input observable to be processed.
   * @param {any} context - Additional context or parameters for deriving the observable.
   * @returns {any} The result of combining the processed observables.
   */
  return function processAndCombineObservables(subscription, inputObservable, context) {
    // Derive a new observable from the source using the provided context
    const derivedObservable = createHmacBase64Hasher(sourceObservable)(subscription, context);
    // Convert both input and derived observables to Ed instances and combine them
    return rA5(Ed.from(inputObservable), Ed.from(derivedObservable));
  };
}

module.exports = createCombinedObservableProcessor;