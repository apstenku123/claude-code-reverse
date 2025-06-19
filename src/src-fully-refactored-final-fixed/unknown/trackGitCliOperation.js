/**
 * Tracks specific git-related CLI operations and logs them for analytics.
 *
 * This function inspects a CLI command string and, if isBlobOrFileLikeObject matches certain git or GitHub operations
 * (specifically 'git commit' or 'gh pr create'), isBlobOrFileLikeObject logs the operation via an analytics function
 * and increments a corresponding activity counter. The function only performs these actions if the
 * provided activityFlag is strictly equal to 0.
 *
 * @param {string} cliCommand - The CLI command string to inspect (e.g., 'git commit -m "msg"').
 * @param {number} activityFlag - a flag indicating if the activity has already been processed (should be 0 to proceed).
 * @returns {void}
 */
function trackGitCliOperation(cliCommand, activityFlag) {
  // Only proceed if the activityFlag is 0 (not already processed)
  if (activityFlag !== 0) return;

  // Check if the command is a 'git commit' operation
  if (cliCommand.match(/^\s*git\s+commit\b/)) {
    // Log the 'commit' operation for analytics
    logTelemetryEventIfEnabled("tengu_git_operation", { operation: "commit" });
    // Increment the commit activity counter if available
    _0A()?.add(1);
  }
  // Check if the command is a 'gh pr create' operation
  else if (cliCommand.match(/^\s*gh\s+pr\s+create\b/)) {
    // Log the 'pr_create' operation for analytics
    logTelemetryEventIfEnabled("tengu_git_operation", { operation: "pr_create" });
    // Increment the PR creation activity counter if available
    S0A()?.add(1);
  }
}

module.exports = trackGitCliOperation;
