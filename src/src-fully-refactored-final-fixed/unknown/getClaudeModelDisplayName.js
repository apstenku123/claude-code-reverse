/**
 * Returns a human-readable display name for a Claude model identifier string.
 *
 * @param {string} modelIdentifier - The identifier string for a Claude model (e.g., 'claude-3-5-haiku').
 * @returns {string|undefined} The display name for the model if recognized, otherwise undefined.
 */
function getClaudeModelDisplayName(modelIdentifier) {
  // Convert the identifier to lowercase for case-insensitive matching
  const normalizedIdentifier = modelIdentifier.toLowerCase();

  // Check for known Claude model substrings and return their display names
  if (normalizedIdentifier.includes("claude-sonnet-4")) {
    return "Sonnet 4";
  }
  if (normalizedIdentifier.includes("claude-opus-4")) {
    return "Opus 4";
  }
  if (normalizedIdentifier.includes("claude-3-7-sonnet")) {
    return "Claude 3.7 Sonnet";
  }
  if (normalizedIdentifier.includes("claude-3-5-sonnet")) {
    return "Claude 3.5 Sonnet";
  }
  if (normalizedIdentifier.includes("claude-3-5-haiku")) {
    return "Claude 3.5 Haiku";
  }
  // Return undefined if no known model substring is found
  return;
}

module.exports = getClaudeModelDisplayName;
