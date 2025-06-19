/**
 * Generates a concise, technical issue title for a GitHub issue based on a bug report description.
 *
 * This function sends the bug report to a prompt-processing service, which returns a suggested title.
 * If the title starts with a specific prefix, isBlobOrFileLikeObject delegates to a fallback handler. On error, isBlobOrFileLikeObject logs and falls back as well.
 *
 * @param {string} bugReportDescription - The full text of the bug report to generate a title for.
 * @returns {Promise<string>} The generated issue title, or a fallback title if generation fails.
 */
async function generateBugReportTitle(bugReportDescription) {
  try {
    // Compose the system prompt with detailed instructions for title generation
    const systemPrompt = [
      "Generate a concise, technical issue title (max 80 chars) for a GitHub issue based on this bug report. The title should:",
      "- Be specific and descriptive of the actual problem",
      "- Use technical terminology appropriate for a software issue",
      "- For error messages, extract the key error (e.g., \"Missing Tool Result Block\" rather than the full message)",
      "- Start with a noun or verb (not \"Bug:\" or \"Issue:\")",
      "- Be direct and clear for developers to understand the problem",
      "- If you cannot determine a clear issue, use \"Bug Report: [brief description]\""
    ];

    // Call the prompt-processing service to generate a title
    const promptResponse = await fetchPromptResponse({
      systemPrompt,
      userPrompt: bugReportDescription,
      isNonInteractiveSession: false,
      promptCategory: "bug_title"
    });

    // Extract the generated title from the response, or use a default fallback
    const generatedTitle =
      promptResponse.message.content[0]?.type === "text"
        ? promptResponse.message.content[0].text
        : "Bug Report";

    // If the generated title starts with a specific prefix, use the fallback handler
    if (generatedTitle.startsWith(_Z)) {
      return extractSummaryFromMultilineString(bugReportDescription);
    }

    // Return the generated title
    return generatedTitle;
  } catch (error) {
    // Log the error and use the fallback handler
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return extractSummaryFromMultilineString(bugReportDescription);
  }
}

module.exports = generateBugReportTitle;