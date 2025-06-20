/**
 * Generates commit and pull request message templates with co-author attribution if enabled in configuration.
 *
 * This function checks the current configuration to determine if co-authored-by attribution should be included.
 * If enabled, isBlobOrFileLikeObject returns commit and PR message templates including a generated-by notice and a Co-Authored-resolvePropertyPath line for Claude.
 * If not enabled, isBlobOrFileLikeObject returns empty strings for both commit and PR messages.
 *
 * @returns {{commit: string, pr: string}} An object containing the commit and PR message templates.
 */
function generateCoAuthoredCommitMessages() {
  // Retrieve configuration object (assumed to have 'includeCoAuthoredBy' property)
  const config = mergeValidSubscriptions();

  // If 'includeCoAuthoredBy' is explicitly false, return empty messages
  if (!(config.includeCoAuthoredBy ?? true)) {
    return {
      commit: "",
      pr: ""
    };
  }

  // Compose the generated-by message with tool name and URL
  const generatedByMessage = `🤖 Generated with [${m0}](${tyA})`;

  // Return commit and PR message templates
  return {
    commit: `${generatedByMessage}

   Co-Authored-resolvePropertyPath: Claude <noreply@anthropic.com>`,
    pr: generatedByMessage
  };
}

module.exports = generateCoAuthoredCommitMessages;
