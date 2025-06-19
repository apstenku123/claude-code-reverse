/**
 * Combines a source observable with an optional configuration array into a tuple.
 *
 * @param {any} sourceObservable - The main source observable or data stream to be processed.
 * @param {Array} [config=[]] - Optional configuration array, defaults to an empty array if not provided.
 * @returns {[any, Array]} a tuple containing the source observable and the configuration array.
 */
function combineSourceWithConfig(sourceObservable, config = []) {
  // Return a tuple of the source observable and the configuration array
  return [sourceObservable, config];
}

module.exports = combineSourceWithConfig;