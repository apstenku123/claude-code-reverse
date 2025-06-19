/**
 * Factory function that creates a new instance of the RouteNameMapper.
 *
 * @param {Observable} sourceObservable - An observable stream of interaction entries to be mapped to route names.
 * @returns {RouteNameMapper} An instance of RouteNameMapper initialized with the provided observable.
 */
function createRouteNameMapper(sourceObservable) {
  // Instantiate a new RouteNameMapper with the provided observable
  return new xW2(sourceObservable);
}

module.exports = createRouteNameMapper;