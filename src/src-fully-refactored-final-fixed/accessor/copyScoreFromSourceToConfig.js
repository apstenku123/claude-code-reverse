/**
 * Copies the 'score' property from the source observable object to the configuration object.
 *
 * @param {Object} sourceObservable - The object containing the 'score' property to copy.
 * @param {Object} config - The object to which the 'score' property will be assigned.
 * @returns {void} This function does not return a value.
 */
function copyScoreFromSourceToConfig(sourceObservable, config) {
  // Assign the 'score' property from sourceObservable to config
  config.score = sourceObservable.score;
}

module.exports = copyScoreFromSourceToConfig;