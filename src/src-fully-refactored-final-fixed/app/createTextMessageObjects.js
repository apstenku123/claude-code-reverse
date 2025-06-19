/**
 * Creates an array of text message objects from the provided input, with optional cache control metadata.
 *
 * @param {string[]} inputStrings - An array of input strings to be processed into message objects.
 * @param {boolean} [isCachingEnabled=isPromptCachingEnabled()] - Optional flag to determine if cache control should be added. Defaults to the result of isPromptCachingEnabled().
 * @returns {Object[]} Array of message objects, each containing a 'type' and 'text' property, and optionally a 'cache_control' property if caching is enabled.
 */
function createTextMessageObjects(inputStrings, isCachingEnabled = isPromptCachingEnabled()) {
  // Split input strings into meaningful message segments
  const messageSegments = splitFirstLineAndRest(inputStrings);

  // Map each segment to a message object, adding cache control if enabled
  return messageSegments.map(segment => ({
    type: "text",
    text: segment,
    ...(isCachingEnabled ? {
      cache_control: {
        type: "ephemeral"
      }
    } : {})
  }));
}

module.exports = createTextMessageObjects;