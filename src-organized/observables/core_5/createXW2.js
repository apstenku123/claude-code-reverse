/**
 * Factory function that creates a new xW2 instance using the provided source observable.
 *
 * @param {Observable} sourceObservable - The observable representing user interaction entries. This will be processed by xW2, which internally uses mapInteractionsToRouteNames to map each entry to a route name and context.
 * @returns {xW2} a new instance of xW2 initialized with the given source observable.
 */
function createXW2Instance(sourceObservable) {
  // Instantiate and return a new xW2 object with the provided observable
  return new xW2(sourceObservable);
}

module.exports = createXW2Instance;