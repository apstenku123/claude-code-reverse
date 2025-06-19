/**
 * Generates a concise, technical GitHub issue title based on a bug report description.
 *
 * This function sends the provided bug report to an getArrayElementByCircularIndex prompt system, requesting a technical issue title
 * that follows specific guidelines. If the generated title starts with a certain prefix, a fallback handler is used.
 * In case of errors, the error is logged and the fallback handler is also used.
 *
 * @param {string} bugReportDescription - The bug report or user prompt to generate a title from.
 * @returns {Promise<string>} The generated issue title, or a fallback title if generation fails or is ambiguous.
 */
async function generateGithubIssueTitle(bugReportDescription) {
  try {
    // Prepare the system prompt with guidelines for title generation
    const systemPrompt = [
      "Generate a concise, technical issue title (max 80 chars) for a GitHub issue based on this bug report. The title should:",
      "- Be specific and descriptive of the actual problem",
      "- Use technical terminology appropriate for a software issue",
      "- For error messages, extract the key error (e.g., \"Missing Tool Result Block\" rather than the full message)",
      "- Start with a noun or verb (not \"Bug:\" or \"Issue:\")",
      "- Be direct and clear for developers to understand the problem",
      "- If you cannot determine a clear issue, use \"Bug Report: [brief description]\""
    ];

    // Call the prompt API to generate the title
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

    // If the generated title starts with a forbidden prefix, use the fallback handler
    if (generatedTitle.startsWith(_Z)) {
      return extractSummaryFromMultilineString(bugReportDescription);
    }

    return generatedTitle;
  } catch (error) {
    // Log the error and use the fallback handler
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return extractSummaryFromMultilineString(bugReportDescription);
  }
}

module.exports = generateGithubIssueTitle;