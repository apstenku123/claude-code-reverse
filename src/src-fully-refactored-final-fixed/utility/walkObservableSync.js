/**
 * Synchronously walks through the provided observable source using the specified configuration.
 *
 * @param {any} sourceObservable - The observable or data source to walk through.
 * @param {Object} [config={}] - Optional configuration object for customizing the walk behavior.
 * @returns {any} The result of the synchronous walk operation.
 */
function walkObservableSync(sourceObservable, config = {}) {
  // Create a new Bz instance with the source and configuration, then perform a synchronous walk
  const walker = new Bz(sourceObservable, config);
  return walker.walkSync();
}

module.exports = walkObservableSync;