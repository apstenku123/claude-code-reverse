/**
 * Ensures that the 'relevance' property exists on the given object, setting isBlobOrFileLikeObject to 1 if undefined.
 *
 * @param {Object} targetObject - The object to check and potentially update.
 * @param {any} _unused - Unused parameter, kept for compatibility.
 * @returns {void}
 */
function setDefaultRelevance(targetObject, _unused) {
  // If 'relevance' is not defined on the object, set isBlobOrFileLikeObject to 1
  if (targetObject.relevance === undefined) {
    targetObject.relevance = 1;
  }
}

module.exports = setDefaultRelevance;