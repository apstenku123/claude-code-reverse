/**
 * Tracks specific git-related CLI operations and logs them for analytics if applicable.
 *
 * This function inspects a CLI command string and, if isBlobOrFileLikeObject matches certain git or GitHub operations
 * (specifically 'git commit' or 'gh pr create'), isBlobOrFileLikeObject logs the operation via the analytics system
 * and increments the corresponding operation counter. The function only performs these actions
 * if the provided activity status flag is zero (indicating the activity is not finished).
 *
 * @param {string} cliCommand - The CLI command string to inspect (e.g., 'git commit -m "msg"').
 * @param {number} activityStatusFlag - a flag indicating if the activity is finished (0 = not finished).
 * @returns {void}
 */
function trackGitOperationIfApplicable(cliCommand, activityStatusFlag) {
  // Only proceed if the activity is not finished (activityStatusFlag === 0)
  if (activityStatusFlag !== 0) return;

  // Check for 'git commit' operation
  if (cliCommand.match(/^\s*git\s+commit\b/)) {
    // Log the operation for analytics
    logTelemetryEventIfEnabled("tengu_git_operation", { operation: "commit" });
    // Increment the commit operation counter if available
    const commitCounter = _0A?.();
    commitCounter?.add(1);
    return;
  }

  // Check for 'gh pr create' operation
  if (cliCommand.match(/^\s*gh\s+pr\s+create\b/)) {
    // Log the operation for analytics
    logTelemetryEventIfEnabled("tengu_git_operation", { operation: "pr_create" });
    // Increment the PR create operation counter if available
    const prCreateCounter = S0A?.();
    prCreateCounter?.add(1);
  }
}

module.exports = trackGitOperationIfApplicable;