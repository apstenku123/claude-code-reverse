/**
 * Recursively maps over an observable or array of observables, applying a mapping function to each element.
 *
 * If the input is an array, the mapping function is applied to each element recursively.
 * If the input is an object that matches the 'mp' predicate, the mapping is applied recursively as well.
 * Otherwise, the provided mapping function is called with the current value, its index, and the original observable.
 *
 * @param {any} sourceObservable - The observable, array, or object to map over.
 * @param {Function} mappingFunction - The function to apply to each element. Receives (currentValue, index, sourceObservable).
 * @returns {any} The mapped observable, array, or object, with the same structure as the input.
 */
function mapObservableArray(sourceObservable, mappingFunction) {
  return JE1(sourceObservable, (subscription, index) => {
    // If the current subscription is an array, map recursively over its elements
    if (Array.isArray(subscription)) {
      return subscription.map(element => mapObservableArray(element, mappingFunction));
    }
    // If the current subscription matches the 'mp' predicate, map recursively
    if (mp(subscription)) {
      return mapObservableArray(subscription, mappingFunction);
    }
    // Otherwise, apply the mapping function to the current value
    return mappingFunction(subscription, index, sourceObservable);
  });
}

module.exports = mapObservableArray;
