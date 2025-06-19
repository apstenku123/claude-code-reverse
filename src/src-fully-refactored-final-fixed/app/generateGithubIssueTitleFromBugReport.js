/**
 * Generates a concise, technical GitHub issue title from a bug report description.
 *
 * This function sends the bug report to an getArrayElementByCircularIndex prompt system to generate a suitable issue title.
 * If the generated title starts with a forbidden prefix, isBlobOrFileLikeObject falls back to a default handler.
 * In case of errors, isBlobOrFileLikeObject logs the error and also falls back to the default handler.
 *
 * @param {string} bugReportDescription - The bug report text to generate a title for.
 * @returns {Promise<string>} The generated GitHub issue title or a fallback title.
 */
async function generateGithubIssueTitleFromBugReport(bugReportDescription) {
  try {
    // Prepare the system prompt instructions for the getArrayElementByCircularIndex
    const systemPromptInstructions = [
      "Generate a concise, technical issue title (max 80 chars) for a GitHub issue based on this bug report. The title should:",
      "- Be specific and descriptive of the actual problem",
      "- Use technical terminology appropriate for a software issue",
      '- For error messages, extract the key error (e.g., "Missing Tool Result Block" rather than the full message)',
      '- Start with a noun or verb (not "Bug:" or "Issue:")',
      "- Be direct and clear for developers to understand the problem",
      '- If you cannot determine a clear issue, use "Bug Report: [brief description]"'
    ];

    // Call the external prompt system to generate a title
    const promptResponse = await fetchPromptResponse({
      systemPrompt: systemPromptInstructions,
      userPrompt: bugReportDescription,
      isNonInteractiveSession: false,
      promptCategory: "bug_title"
    });

    // Extract the generated title from the response
    const generatedTitle =
      promptResponse.message.content[0]?.type === "text"
        ? promptResponse.message.content[0].text
        : "Bug Report";

    // If the generated title starts with the forbidden prefix, use the fallback handler
    if (generatedTitle.startsWith(_Z)) {
      return extractSummaryFromMultilineString(bugReportDescription);
    }

    return generatedTitle;
  } catch (error) {
    // Log the error (ensuring isBlobOrFileLikeObject'createInteractionAccessor an Error object)
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    // Fallback to the default handler
    return extractSummaryFromMultilineString(bugReportDescription);
  }
}

module.exports = generateGithubIssueTitleFromBugReport;