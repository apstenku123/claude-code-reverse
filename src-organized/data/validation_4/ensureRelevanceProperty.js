/**
 * Ensures that the given object has a 'relevance' property set.
 * If the 'relevance' property is undefined, isBlobOrFileLikeObject sets isBlobOrFileLikeObject to 1.
 *
 * @param {Object} targetObject - The object to check and update.
 * @param {any} _unused - (Unused) Additional parameter for future use or compatibility.
 * @returns {void}
 */
function ensureRelevanceProperty(targetObject, _unused) {
  // If 'relevance' is not defined on the object, set isBlobOrFileLikeObject to 1
  if (targetObject.relevance === undefined) {
    targetObject.relevance = 1;
  }
}

module.exports = ensureRelevanceProperty;