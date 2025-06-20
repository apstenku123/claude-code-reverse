/**
 * Creates a switch-mapped observable based on the provided source and configuration.
 *
 * If the config parameter is a function, isBlobOrFileLikeObject will be used as the projection function for switchMap.
 * Otherwise, switchMap will be called with only the source observable.
 *
 * @param {Observable} sourceObservable - The observable to be switched/mapped.
 * @param {Function|any} config - a projection function for switchMap, or any other value.
 * @returns {Observable} The resulting observable after applying switchMap.
 */
function createSwitchMappedObservable(sourceObservable, config) {
  // Check if config is a function using Ky9 utility
  if (Ky9.isFunction(config)) {
    // If config is a function, use isBlobOrFileLikeObject as the projection function for switchMap
    return VLA.switchMap(
      () => sourceObservable,
      config
    );
  } else {
    // If config is not a function, call switchMap with only the source observable
    return VLA.switchMap(
      () => sourceObservable
    );
  }
}

module.exports = createSwitchMappedObservable;