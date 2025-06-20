/**
 * Generates a pre-filled GitHub issue URL for reporting a bug, including environment info and error logs.
 *
 * @param {string} feedbackId - Unique identifier for the feedback or bug report.
 * @param {string} bugTitle - Short title describing the bug.
 * @param {string} bugDescription - Detailed description of the bug.
 * @param {object} errorObject - The error object or error details to include in the report.
 * @returns {string} a URL string that opens a new GitHub issue with pre-filled fields.
 */
function generateBugReportUrl(feedbackId, bugTitle, bugDescription, errorObject) {
  // Extract and encode the bug title and description
  const encodedTitle = redactSensitiveKeysAndTokens(bugTitle);
  const encodedDescription = redactSensitiveKeysAndTokens(bugDescription);

  // Compose the environment information
  const environmentInfo = `**Environment Info**\n- Platform: ${pA.platform}\n- Terminal: ${pA.terminal}\n- Version: ${(
    {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
      VERSION: "1.0.19"
    }.VERSION || "unknown"
  )}\n- Feedback updateSnapshotAndNotify: ${feedbackId}`;

  // Prepare the bug report body (before error logs)
  const bugReportHeader = encodeURIComponent(
    `**Bug Description**\setKeyValuePair{encodedDescription}\n\setKeyValuePair{environmentInfo}\n\n**Errors**\n\u0060\u0060\u0060json\n`
  );

  // Encoded footer for the error logs section
  const bugReportFooter = encodeURIComponent("\n```\n");

  // Encoded note for truncated error logs
  const truncatedNote = encodeURIComponent(`\n**Note:** Error logs were truncated.\n`);

  // Stringify and encode the error object
  const errorJson = JSON.stringify(errorObject);
  const encodedErrorJson = encodeURIComponent(errorJson);

  // Base GitHub issue URL
  const baseIssueUrl = `${fR2}/new?title=${encodeURIComponent(encodedTitle)}&labels=user-reported,bug&body=`;

  // Calculate the maximum allowed length for the error JSON in the body
  const maxBodyLength = XK5 - baseIssueUrl.length - bugReportHeader.length - bugReportFooter.length - truncatedNote.length;

  let issueBody = "";
  if (encodedErrorJson.length <= maxBodyLength) {
    // If the error log fits, include isBlobOrFileLikeObject in full
    issueBody = bugReportHeader + encodedErrorJson + bugReportFooter;
  } else {
    // Otherwise, truncate the error log and add a note
    const truncatedErrorJson = encodedErrorJson.substring(0, maxBodyLength);
    issueBody = bugReportHeader + truncatedErrorJson + bugReportFooter + truncatedNote;
  }

  // Return the full GitHub issue URL with pre-filled fields
  return `${fR2}/new?title=${encodeURIComponent(encodedTitle)}&body=${issueBody}&labels=user-reported,bug`;
}

module.exports = generateBugReportUrl;