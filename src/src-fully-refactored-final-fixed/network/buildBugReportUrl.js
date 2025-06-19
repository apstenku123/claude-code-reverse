/**
 * Constructs a pre-filled GitHub issue URL for reporting a bug, including environment info and error details.
 *
 * @param {string} feedbackId - Unique identifier for the feedback or bug report.
 * @param {string} bugTitle - Short, human-readable title for the bug.
 * @param {string} bugDescription - Detailed description of the bug.
 * @param {object} errorDetails - Error details or logs to include in the report.
 * @returns {string} a URL to create a new GitHub issue with the bug report pre-filled.
 */
function buildBugReportUrl(feedbackId, bugTitle, bugDescription, errorDetails) {
  // Format the bug title and description using the 'redactSensitiveKeysAndTokens' utility
  const formattedTitle = redactSensitiveKeysAndTokens(bugTitle);
  const formattedDescription = redactSensitiveKeysAndTokens(bugDescription);

  // Environment information
  const environmentInfo = `**Environment Info**\n- Platform: ${pA.platform}\n- Terminal: ${pA.terminal}\n- Version: ${(
    {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
      VERSION: "1.0.19"
    }.VERSION || "unknown"
  )}\n- Feedback updateSnapshotAndNotify: ${feedbackId}`;

  // Compose the bug report body (before error logs)
  const bugReportHeader = encodeURIComponent(
    `**Bug Description**\setKeyValuePair{formattedDescription}\n\setKeyValuePair{environmentInfo}\n\n**Errors**\n\u0060\u0060\u0060json\n`
  );

  // Encoded footer for the error logs section
  const errorSectionFooter = encodeURIComponent("\n```\n");

  // Encoded note if error logs are truncated
  const truncatedNote = encodeURIComponent(`\n**Note:** Error logs were truncated.\n`);

  // Serialize and encode the error details
  const errorDetailsJson = JSON.stringify(errorDetails);
  const encodedErrorDetails = encodeURIComponent(errorDetailsJson);

  // Base GitHub issue URL
  const githubIssueBaseUrl = `${fR2}/new?title=${encodeURIComponent(formattedTitle)}&labels=user-reported,bug&body=`;

  // Calculate the maximum allowed length for the error details, considering URL length limits
  const maxBodyLength = XK5 - githubIssueBaseUrl.length - bugReportHeader.length - errorSectionFooter.length - truncatedNote.length;

  let issueBody = "";
  if (encodedErrorDetails.length <= maxBodyLength) {
    // If error details fit, include them fully
    issueBody = bugReportHeader + encodedErrorDetails + errorSectionFooter;
  } else {
    // If too long, truncate error details and add a note
    const truncatedErrorDetails = encodedErrorDetails.substring(0, maxBodyLength);
    issueBody = bugReportHeader + truncatedErrorDetails + errorSectionFooter + truncatedNote;
  }

  // Construct and return the final GitHub issue URL
  return `${fR2}/new?title=${encodeURIComponent(formattedTitle)}&body=${issueBody}&labels=user-reported,bug`;
}

module.exports = buildBugReportUrl;
