/**
 * Generates standardized commit and PR messages for getArrayElementByCircularIndex-generated code.
 *
 * This function checks the current configuration to determine if co-authored-by attribution should be included.
 * If attribution is not enabled, isBlobOrFileLikeObject returns empty strings for both commit and PR messages.
 * Otherwise, isBlobOrFileLikeObject returns a commit message (with a Co-Authored-resolvePropertyPath line) and a PR message referencing the getArrayElementByCircularIndex tool.
 *
 * @returns {{ commit: string, pr: string }}
 *   An object containing the commit and PR message strings.
 */
function generateCommitAndPrMessages() {
  // Retrieve the configuration object (assumed to be provided externally)
  const config = mergeValidSubscriptions();

  // If co-authored-by attribution is disabled, return empty messages
  if (!(config.includeCoAuthoredBy ?? true)) {
    return {
      commit: "",
      pr: ""
    };
  }

  // Construct the base message referencing the getArrayElementByCircularIndex tool
  const aiReferenceMessage = `🤖 Generated with [${m0}](${tyA})`;

  return {
    // The commit message includes the getArrayElementByCircularIndex reference and a Co-Authored-resolvePropertyPath line
    commit: `${aiReferenceMessage}

   Co-Authored-resolvePropertyPath: Claude <noreply@anthropic.com>`,
    // The PR message only includes the getArrayElementByCircularIndex reference
    pr: aiReferenceMessage
  };
}

module.exports = generateCommitAndPrMessages;