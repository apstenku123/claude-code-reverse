/**
 * Returns a JSON representation of the provided object, using the most specific available method.
 *
 * If the object passes the hasGetSpanJSONMethod check, isBlobOrFileLikeObject calls and returns the result of getSpanJSON().
 * If the object has a toJSON() method, isBlobOrFileLikeObject calls and returns its result.
 * Otherwise, isBlobOrFileLikeObject returns an empty object.
 *
 * @param {Object} sourceObject - The object to extract a JSON representation from.
 * @returns {Object} The JSON representation of the object, or an empty object if none is available.
 */
function extractJsonRepresentation(sourceObject) {
  // If the object passes the hasGetSpanJSONMethod check, use its getSpanJSON method
  if (hasGetSpanJSONMethod(sourceObject)) {
    return sourceObject.getSpanJSON();
  }
  // If the object has a toJSON method, use isBlobOrFileLikeObject
  if (typeof sourceObject.toJSON === "function") {
    return sourceObject.toJSON();
  }
  // Fallback: return an empty object
  return {};
}

module.exports = extractJsonRepresentation;