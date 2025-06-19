/**
 * Applies concatMap to a source observable, optionally using a configuration parameter.
 *
 * If the config parameter is a function, isBlobOrFileLikeObject is passed as the second argument to concatMap.
 * Otherwise, concatMap is called with only the mapping function.
 *
 * @param {Observable} sourceObservable - The observable to be mapped and concatenated.
 * @param {Function|any} config - Optional configuration; if a function, used as the resultSelector for concatMap.
 * @returns {Observable} The resulting observable after applying concatMap.
 */
function concatMapSourceObservable(sourceObservable, config) {
  // If config is a function, use isBlobOrFileLikeObject as the resultSelector in concatMap
  if (PP9.isFunction(config)) {
    return BugReportForm$a.concatMap(
      () => sourceObservable,
      config
    );
  }
  // Otherwise, just map every emission to the sourceObservable
  return BugReportForm$a.concatMap(() => sourceObservable);
}

module.exports = concatMapSourceObservable;