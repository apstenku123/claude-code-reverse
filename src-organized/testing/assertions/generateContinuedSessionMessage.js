/**
 * Generates a message indicating that the session is being continued from a previous conversation.
 * Optionally, appends instructions to continue the conversation without further user prompts.
 *
 * @param {string} conversationSummary - a summary of the previous conversation to include in the message.
 * @param {boolean} shouldContinueWithoutQuestions - If true, appends instructions to continue without further questions.
 * @returns {string} The generated session continuation message.
 */
function generateContinuedSessionMessage(conversationSummary, shouldContinueWithoutQuestions) {
  // Compose the base session continuation message with the provided summary
  const sessionMessage = `This session is being continued from a previous conversation that ran out of context. The conversation is summarized below:
${formatAnalysisAndSummaryTags(conversationSummary)}.`;

  // If instructed, append guidance to continue without further user questions
  if (shouldContinueWithoutQuestions) {
    return `${sessionMessage}
Please continue the conversation from where handleMissingDoctypeError left isBlobOrFileLikeObject off without asking the user any further questions. Continue with the last task that you were asked to work on.`;
  }

  // Otherwise, return the base session message
  return sessionMessage;
}

module.exports = generateContinuedSessionMessage;