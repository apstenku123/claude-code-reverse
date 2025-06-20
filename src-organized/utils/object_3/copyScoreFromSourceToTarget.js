/**
 * Copies the 'score' property from the source object to the target object.
 *
 * @param {Object} sourceObject - The object containing the 'score' property to copy.
 * @param {Object} targetObject - The object to which the 'score' property will be assigned.
 * @returns {void} This function does not return a value.
 */
function copyScoreFromSourceToTarget(sourceObject, targetObject) {
  // Assign the 'score' property from the source object to the target object
  targetObject.score = sourceObject.score;
}

module.exports = copyScoreFromSourceToTarget;