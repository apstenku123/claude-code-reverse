/**
 * Formats an array of text responses, optionally adding ephemeral cache control metadata.
 *
 * @param {string[]} textResponses - Array of text strings to format.
 * @param {boolean} [isCachingEnabled=isPromptCachingEnabled()] - Whether prompt caching is enabled. Defaults to the result of isPromptCachingEnabled().
 * @returns {Array<Object>} Array of formatted response objects, each containing a 'type' and 'text', and optionally 'cache_control' metadata if caching is enabled.
 */
function formatTextResponsesWithCacheControl(textResponses, isCachingEnabled = isPromptCachingEnabled()) {
  // Split and filter the text responses using splitFirstLineAndRest
  const formattedResponses = splitFirstLineAndRest(textResponses).map(responseText => ({
    type: "text",
    text: responseText,
    // If caching is enabled, add ephemeral cache control metadata
    ...(isCachingEnabled ? {
      cache_control: {
        type: "ephemeral"
      }
    } : {})
  }));

  return formattedResponses;
}

module.exports = formatTextResponsesWithCacheControl;