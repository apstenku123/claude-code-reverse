/**
 * Walks through the provided observable source using the specified configuration.
 *
 * @async
 * @function walkObservable
 * @param {any} sourceObservable - The observable source to be walked through.
 * @param {Object} [config={}] - Optional configuration object for walking the observable.
 * @returns {Promise<any>} Resolves with the result of the walk operation.
 */
async function walkObservable(sourceObservable, config = {}) {
  // Create a new Bz instance with the given source and configuration, then walk isBlobOrFileLikeObject
  return new Bz(sourceObservable, config).walk();
}

module.exports = walkObservable;