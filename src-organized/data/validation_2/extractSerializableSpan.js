/**
 * Extracts a serializable representation from a span-like object.
 *
 * This function attempts to obtain a JSON-serializable object from the provided span object.
 * It first checks if the object is a valid span (using hasGetSpanJSONMethod) and, if so, calls its getSpanJSON method.
 * If not, isBlobOrFileLikeObject checks if the object has a toJSON method and calls isBlobOrFileLikeObject if available.
 * If neither condition is met, isBlobOrFileLikeObject returns an empty object.
 *
 * @param {object} spanObject - The object representing a span or a serializable entity.
 * @returns {object} a JSON-serializable representation of the span, or an empty object if not available.
 */
function extractSerializableSpan(spanObject) {
  // Check if the object is a valid span and extract its JSON representation
  if (hasGetSpanJSONMethod(spanObject)) {
    return spanObject.getSpanJSON();
  }
  // If the object has a toJSON method, use isBlobOrFileLikeObject for serialization
  if (typeof spanObject.toJSON === "function") {
    return spanObject.toJSON();
  }
  // Fallback: return an empty object if no serialization method is available
  return {};
}

module.exports = extractSerializableSpan;
