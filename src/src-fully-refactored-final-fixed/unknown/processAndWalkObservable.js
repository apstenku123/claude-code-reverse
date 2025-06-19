/**
 * Processes the given observable source with the provided configuration and walks through its structure.
 *
 * @async
 * @function processAndWalkObservable
 * @param {any} sourceObservable - The source observable or data structure to process.
 * @param {Object} [config={}] - Optional configuration object to customize processing behavior.
 * @returns {Promise<any>} The result of the walk operation on the processed observable.
 */
async function processAndWalkObservable(sourceObservable, config = {}) {
  // Create a new Bz instance with the source observable and configuration, then perform the walk operation
  return new Bz(sourceObservable, config).walk();
}

module.exports = processAndWalkObservable;