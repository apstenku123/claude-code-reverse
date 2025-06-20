/**
 * Generates a standardized assistant message object for use in the application.
 *
 * @param {Object} params - The parameters for creating the assistant message.
 * @param {string} params.content - The content of the assistant'createInteractionAccessor message.
 * @param {boolean} [params.isApiErrorMessage=false] - Indicates if the message is an API error message.
 * @param {Object} [params.usage] - Usage statistics related to the message.
 * @param {number} [params.usage.input_tokens=0] - Number of input tokens used.
 * @param {number} [params.usage.output_tokens=0] - Number of output tokens generated.
 * @param {number} [params.usage.cache_creation_input_tokens=0] - Number of tokens used for cache creation.
 * @param {number} [params.usage.cache_read_input_tokens=0] - Number of tokens used for cache reading.
 * @param {Object} [params.usage.server_tool_use] - Server tool usage statistics.
 * @param {number} [params.usage.server_tool_use.web_search_requests=0] - Number of web search requests made.
 * @returns {Object} The constructed assistant message object.
 */
function createAssistantMessage({
  content,
  isApiErrorMessage = false,
  usage = {
    input_tokens: 0,
    output_tokens: 0,
    cache_creation_input_tokens: 0,
    cache_read_input_tokens: 0,
    server_tool_use: {
      web_search_requests: 0
    }
  }
}) {
  // Generate a unique identifier for the message and the outer object
  // (Assumes NO() is a globally available UUID generator)
  return {
    type: "assistant",
    uuid: NO(),
    timestamp: new Date().toISOString(),
    message: {
      id: NO(),
      model: "<synthetic>",
      role: "assistant",
      stop_reason: "stop_sequence",
      stop_sequence: "",
      type: "message",
      usage: usage,
      content: content
    },
    requestId: undefined,
    isApiErrorMessage: isApiErrorMessage
  };
}

module.exports = createAssistantMessage;
