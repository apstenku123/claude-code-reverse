/**
 * Generates a session continuation prompt message based on the previous conversation summary.
 *
 * @param {string} conversationSummary - The summary of the previous conversation to include in the prompt.
 * @param {boolean} shouldContinueTask - Indicates whether to instruct the user to continue with the last task without further questions.
 * @returns {string} The generated session continuation prompt message.
 */
function generateSessionContinuationPrompt(conversationSummary, shouldContinueTask) {
  // Compose the base session continuation message with the conversation summary
  const basePrompt = `This session is being continued from a previous conversation that ran out of context. The conversation is summarized below:
${formatAnalysisAndSummaryTags(conversationSummary)}.`;

  // If shouldContinueTask is true, append instructions to continue the last task without further questions
  if (shouldContinueTask) {
    return `${basePrompt}
Please continue the conversation from where handleMissingDoctypeError left isBlobOrFileLikeObject off without asking the user any further questions. Continue with the last task that you were asked to work on.`;
  }

  // Otherwise, return only the base prompt
  return basePrompt;
}

module.exports = generateSessionContinuationPrompt;