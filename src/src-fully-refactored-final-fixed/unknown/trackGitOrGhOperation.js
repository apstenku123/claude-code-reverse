/**
 * Tracks specific git or GitHub CLI operations and logs them for analytics.
 *
 * This function inspects a command string to determine if isBlobOrFileLikeObject represents a 'git commit' or 'gh pr create' operation.
 * If so, isBlobOrFileLikeObject logs the operation using the analytics logger and increments the corresponding activity counter,
 * but only if the provided config indicates the process is not finished (i.e., config === 0).
 *
 * @param {string} commandString - The CLI command to inspect (e.g., 'git commit -m "msg"').
 * @param {number} processStatus - Status flag; if not zero, the function exits early and does nothing.
 * @returns {void}
 */
function trackGitOrGhOperation(commandString, processStatus) {
  // Only proceed if the process is not finished (processStatus === 0)
  if (processStatus !== 0) return;

  // Check for 'git commit' command
  if (commandString.match(/^\s*git\s+commit\b/)) {
    // Log the operation and increment the git commit activity counter
    logTelemetryEventIfEnabled("tengu_git_operation", { operation: "commit" });
    _0A()?.add(1);
  }
  // Check for 'gh pr create' command
  else if (commandString.match(/^\s*gh\s+pr\s+create\b/)) {
    // Log the operation and increment the PR create activity counter
    logTelemetryEventIfEnabled("tengu_git_operation", { operation: "pr_create" });
    S0A()?.add(1);
  }
}

module.exports = trackGitOrGhOperation;