/**
 * Merges two token usage statistics objects by summing their respective fields.
 *
 * @param {Object} baseStats - The base token usage statistics object.
 * @param {Object} additionalStats - The additional token usage statistics object to merge with the base.
 * @returns {Object} The merged token usage statistics object with summed values.
 */
function mergeTokenUsageStats(baseStats, additionalStats) {
  return {
    // Sum input tokens, defaulting to 0 if missing in additionalStats
    input_tokens: baseStats.input_tokens + (additionalStats.input_tokens ?? 0),

    // Sum cache creation input tokens
    cache_creation_input_tokens: baseStats.cache_creation_input_tokens + (additionalStats.cache_creation_input_tokens ?? 0),

    // Sum cache read input tokens
    cache_read_input_tokens: baseStats.cache_read_input_tokens + (additionalStats.cache_read_input_tokens ?? 0),

    // Sum output tokens
    output_tokens: baseStats.output_tokens + (additionalStats.output_tokens ?? 0),

    // Merge server tool usage, specifically web search requests
    server_tool_use: {
      web_search_requests:
        baseStats.server_tool_use.web_search_requests +
        (additionalStats.server_tool_use?.web_search_requests ?? 0)
    }
  };
}

module.exports = mergeTokenUsageStats;