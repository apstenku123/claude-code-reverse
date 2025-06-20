/**
 * Calculates the total number of tokens used in an interaction, including input, cache creation, cache read, and output tokens.
 *
 * @param {Object} interactionEntry - An object representing an interaction entry.
 * @param {number} interactionEntry.input_tokens - Number of input tokens used.
 * @param {number} [interactionEntry.cache_creation_input_tokens] - Number of input tokens used during cache creation (optional).
 * @param {number} [interactionEntry.cache_read_input_tokens] - Number of input tokens used during cache read (optional).
 * @param {number} interactionEntry.output_tokens - Number of output tokens generated.
 * @returns {number} The total number of tokens used for the interaction.
 */
function calculateTotalTokenCount(interactionEntry) {
  // Use 0 as default if cache_creation_input_tokens or cache_read_input_tokens are undefined
  const cacheCreationTokens = interactionEntry.cache_creation_input_tokens ?? 0;
  const cacheReadTokens = interactionEntry.cache_read_input_tokens ?? 0;

  // Sum all relevant token counts
  const totalTokens = interactionEntry.input_tokens + cacheCreationTokens + cacheReadTokens + interactionEntry.output_tokens;

  return totalTokens;
}

module.exports = calculateTotalTokenCount;