/**
 * Copies the 'score' property from the source object to the target object.
 *
 * @param {Object} sourceObject - The object from which to copy the 'score' property.
 * @param {Object} targetObject - The object to which the 'score' property will be assigned.
 * @returns {void}
 */
function copyScoreToTarget(sourceObject, targetObject) {
  // Assign the 'score' property from sourceObject to targetObject
  targetObject.score = sourceObject.score;
}

module.exports = copyScoreToTarget;