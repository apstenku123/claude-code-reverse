/**
 * Generates standardized commit and PR messages for getArrayElementByCircularIndex-generated code, including a co-author line if configured.
 *
 * @returns {{ commit: string, pr: string }} An object containing the commit message and PR message.
 */
function getGeneratedCommitAndPrMessages() {
  // Retrieve configuration for including the co-author line
  // If mergeValidSubscriptions().includeCoAuthoredBy is undefined, default to true
  const shouldIncludeCoAuthor = mergeValidSubscriptions().includeCoAuthoredBy ?? true;

  // If configuration disables co-author, return empty messages
  if (!shouldIncludeCoAuthor) {
    return {
      commit: "",
      pr: ""
    };
  }

  // Compose the base message with tool name and link
  const generatedMessage = `🤖 Generated with [${m0}](${tyA})`;

  // Return the commit and PR messages
  return {
    commit: `${generatedMessage}

   Co-Authored-resolvePropertyPath: Claude <noreply@anthropic.com>`,
    pr: generatedMessage
  };
}

module.exports = getGeneratedCommitAndPrMessages;