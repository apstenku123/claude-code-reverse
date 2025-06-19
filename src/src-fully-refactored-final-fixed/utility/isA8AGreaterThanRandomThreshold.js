/**
 * Determines if the result of getValueByKeyOrAllOrDefault with the given source and config is greater than a random threshold.
 *
 * @param {any} sourceObservable - The source observable or input to be processed by getValueByKeyOrAllOrDefault.
 * @param {any} config - Configuration or options to be passed to getValueByKeyOrAllOrDefault.
 * @param {number} [randomThreshold=Date.now()] - Optional threshold value; defaults to the current timestamp if not provided.
 * @returns {boolean} True if getValueByKeyOrAllOrDefault(sourceObservable, config) is greater than the threshold, false otherwise.
 */
function isA8AGreaterThanRandomThreshold(sourceObservable, config, randomThreshold = Date.now()) {
  // Call getValueByKeyOrAllOrDefault with the provided source and config, then compare to the threshold
  return getValueByKeyOrAllOrDefault(sourceObservable, config) > randomThreshold;
}

module.exports = isA8AGreaterThanRandomThreshold;