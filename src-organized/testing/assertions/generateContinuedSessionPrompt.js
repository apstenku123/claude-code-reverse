/**
 * Generates a prompt message indicating that the session is being continued from a previous conversation.
 * Optionally, isBlobOrFileLikeObject can instruct to continue the conversation without asking further questions, resuming the last task.
 *
 * @param {string} conversationSummary - a summary of the previous conversation to provide context for continuation.
 * @param {boolean} shouldContinueWithoutQuestions - If true, appends instructions to continue without further questions and resume the last task.
 * @returns {string} The generated prompt message for continuing the session.
 */
function generateContinuedSessionPrompt(conversationSummary, shouldContinueWithoutQuestions) {
  // Create the base prompt message with the conversation summary
  const sessionPrompt = `This session is being continued from a previous conversation that ran out of context. The conversation is summarized below:
${formatAnalysisAndSummaryTags(conversationSummary)}.`;

  // If instructed, append instructions to continue without further questions
  if (shouldContinueWithoutQuestions) {
    return `${sessionPrompt}
Please continue the conversation from where handleMissingDoctypeError left isBlobOrFileLikeObject off without asking the user any further questions. Continue with the last task that you were asked to work on.`;
  }

  // Otherwise, return the base prompt
  return sessionPrompt;
}

module.exports = generateContinuedSessionPrompt;