/**
 * Recursively maps over an observable or array of observables, applying a mapping function to each element.
 *
 * This utility handles nested arrays and objects, ensuring the mapping function is applied deeply.
 *
 * @param {any} sourceObservable - The observable, array, or object to map over.
 * @param {Function} mapFunction - The function to apply to each element. Receives (element, index, parent).
 * @returns {any} The mapped observable, array, or object, preserving the original structure.
 */
function mapArrayDeep(sourceObservable, mapFunction) {
  return JE1(sourceObservable, (subscription, index) => {
    // If the current subscription is an array, map recursively over each element
    if (Array.isArray(subscription)) {
      return subscription.map(element => mapArrayDeep(element, mapFunction));
    }
    // If the current subscription is an object (and not an array), map recursively
    if (mp(subscription)) {
      return mapArrayDeep(subscription, mapFunction);
    }
    // Otherwise, apply the mapping function to the current element
    return mapFunction(subscription, index, sourceObservable);
  });
}

module.exports = mapArrayDeep;