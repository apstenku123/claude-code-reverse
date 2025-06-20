/**
 * Creates a handler function that combines two observables using a transformation and a combiner.
 *
 * @param {any} sourceObservable - The source observable or configuration used to create a transformation function.
 * @returns {function} a handler function that takes a subscription, an inputObservable, and an optional context, then combines the input with a transformed observable.
 */
function createCombinedObservableHandler(sourceObservable) {
  return function handleObservableCombination(subscription, inputObservable, context) {
    // Transform the sourceObservable using createHmacBase64Hasher, passing in the subscription and context
    const transformedObservable = createHmacBase64Hasher(sourceObservable)(subscription, context);
    // Convert both inputObservable and transformedObservable to Ed instances and combine them with rA5
    return rA5(Ed.from(inputObservable), Ed.from(transformedObservable));
  };
}

module.exports = createCombinedObservableHandler;