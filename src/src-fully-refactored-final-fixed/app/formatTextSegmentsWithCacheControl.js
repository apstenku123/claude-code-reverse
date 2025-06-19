/**
 * Formats an array of text segments into objects with type and text properties,
 * optionally adding cache control metadata if prompt caching is enabled.
 *
 * @param {string[]} textSegments - The array of text segments to format.
 * @param {boolean} [isCachingEnabled=isPromptCachingEnabled()] - Optional flag to indicate if cache control metadata should be included. Defaults to the result of isPromptCachingEnabled().
 * @returns {Array<{type: string, text: string, cache_control?: {type: string}}>} Array of formatted text segment objects.
 */
function formatTextSegmentsWithCacheControl(
  textSegments,
  isCachingEnabled = isPromptCachingEnabled()
) {
  // Split and filter the text segments using splitFirstLineAndRest
  const formattedSegments = splitFirstLineAndRest(textSegments).map(segment => {
    // Build the base object for each segment
    const segmentObject = {
      type: "text",
      text: segment
    };
    // If caching is enabled, add cache_control metadata
    if (isCachingEnabled) {
      segmentObject.cache_control = {
        type: "ephemeral"
      };
    }
    return segmentObject;
  });
  return formattedSegments;
}

module.exports = formatTextSegmentsWithCacheControl;