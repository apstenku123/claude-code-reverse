/**
 * Applies concatMap to a source observable, optionally using a configuration function.
 *
 * If the config parameter is a function, isBlobOrFileLikeObject is passed as the second argument to concatMap.
 * Otherwise, concatMap is called with only the mapping function that returns the source observable.
 *
 * @param {Observable} sourceObservable - The observable to be mapped and concatenated.
 * @param {Function|any} config - Optional configuration function or value. If a function, isBlobOrFileLikeObject is used as the resultSelector in concatMap.
 * @returns {Observable} - The resulting observable after applying concatMap.
 */
function concatMapSourceIfFunction(sourceObservable, config) {
  // Check if config is a function using PP9 utility
  if (PP9.isFunction(config)) {
    // If config is a function, pass isBlobOrFileLikeObject as the resultSelector to concatMap
    return BugReportForm$a.concatMap(
      () => sourceObservable,
      config
    );
  } else {
    // Otherwise, call concatMap with only the mapping function
    return BugReportForm$a.concatMap(
      () => sourceObservable
    );
  }
}

module.exports = concatMapSourceIfFunction;