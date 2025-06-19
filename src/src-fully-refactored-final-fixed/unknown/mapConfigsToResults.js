/**
 * Maps a source observable to a set of results using a list of configuration objects.
 *
 * @param {Observable} sourceObservable - The observable to be mapped with each configuration.
 * @returns {Array<any>} An array of results obtained by applying the mapping function to the source observable and each configuration.
 */
function mapConfigsToResults(sourceObservable) {
  // dL9 is assumed to be an array of configuration objects
  // invokeWithSpreadOrDirect is a function that takes (sourceObservable, config) and returns a result
  return dL9.map(function (config) {
    return invokeWithSpreadOrDirect(sourceObservable, config);
  });
}

module.exports = mapConfigsToResults;