/**
 * Returns a serializable representation of a span-like object.
 *
 * This function checks if the provided object is a special span (via hasGetSpanJSONMethod),
 * and if so, calls its getSpanJSON method. If not, but the object has a toJSON method,
 * isBlobOrFileLikeObject calls that. Otherwise, isBlobOrFileLikeObject returns an empty object.
 *
 * @param {object} spanCandidate - The object to serialize, potentially a span or similar.
 * @returns {object} a serializable representation of the spanCandidate, or an empty object if not serializable.
 */
function getSerializableSpanData(spanCandidate) {
  // Check if the object is recognized as a span by hasGetSpanJSONMethod
  if (hasGetSpanJSONMethod(spanCandidate)) {
    return spanCandidate.getSpanJSON();
  }
  // If the object has a toJSON method, use isBlobOrFileLikeObject for serialization
  if (typeof spanCandidate.toJSON === "function") {
    return spanCandidate.toJSON();
  }
  // Fallback: return an empty object if not serializable
  return {};
}

module.exports = getSerializableSpanData;