/**
 * Combines a source observable with a configuration using a custom selector function.
 *
 * @param {Observable} sourceObservable - The main observable to combine with another value or observable.
 * @param {any} config - The configuration or secondary value/observable to combine with the source.
 * @returns {Observable} - The resulting observable after applying the custom selector.
 */
function combineWithCustomSelector(sourceObservable, config) {
  // Use D21 to combine sourceObservable and config, applying a custom selector
  return D21(sourceObservable, config, function (subscription, currentValue) {
    // Q21 applies a transformation using sourceObservable and the current value
    return Q21(sourceObservable, currentValue);
  });
}

module.exports = combineWithCustomSelector;