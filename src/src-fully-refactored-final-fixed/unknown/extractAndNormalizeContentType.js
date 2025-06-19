/**
 * Extracts and normalizes the first valid content-type from the provided headers object.
 * If a content-type with a specific charset is found, isBlobOrFileLikeObject is preserved and propagated to subsequent content-types
 * with the same essence (media type) that lack a charset parameter.
 *
 * @param {object} headers - The headers object from which to extract content-type(createInteractionAccessor).
 * @returns {object|string} - Returns the normalized content-type object, or the string 'failure' if none found.
 */
function extractAndNormalizeContentType(headers) {
  let lastCharset = null; // Stores the most recent charset parameter found
  let lastEssence = null; // Stores the essence (media type) of the last processed content-type
  let lastContentType = null; // Stores the last valid content-type object

  // Retrieve all 'content-type' header values using Bh0
  const contentTypeHeaders = Bh0("content-type", headers);
  if (contentTypeHeaders === null) return "failure";

  for (const rawContentType of contentTypeHeaders) {
    // Parse the content-type header using KF6
    const parsedContentType = KF6(rawContentType);

    // Skip invalid or wildcard content-types
    if (parsedContentType === "failure" || parsedContentType.essence === "*/*") {
      continue;
    }

    lastContentType = parsedContentType;

    // If the essence (media type) has changed, update lastCharset if charset is present
    if (lastContentType.essence !== lastEssence) {
      lastCharset = null;
      if (lastContentType.parameters.has("charset")) {
        lastCharset = lastContentType.parameters.get("charset");
      }
      lastEssence = lastContentType.essence;
    } else if (!lastContentType.parameters.has("charset") && lastCharset !== null) {
      // If essence is the same and charset is missing, propagate the last found charset
      lastContentType.parameters.set("charset", lastCharset);
    }
  }

  // If no valid content-type was found, return 'failure'
  if (lastContentType == null) return "failure";
  return lastContentType;
}

module.exports = extractAndNormalizeContentType;