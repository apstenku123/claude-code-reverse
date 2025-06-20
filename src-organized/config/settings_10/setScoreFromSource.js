/**
 * Sets the score property on the target configuration object using the score from the source object.
 *
 * @param {Object} sourceObject - The object containing the score to be copied.
 * @param {Object} targetConfig - The configuration object whose score property will be set.
 * @returns {void}
 */
function setScoreFromSource(sourceObject, targetConfig) {
  // Copy the score property from the source object to the target configuration
  targetConfig.score = sourceObject.score;
}

module.exports = setScoreFromSource;