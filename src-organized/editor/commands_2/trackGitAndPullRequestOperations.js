/**
 * Tracks and logs specific git and GitHub CLI operations when certain conditions are met.
 *
 * If the configFlag is zero, checks the commandString for either a git commit or a GitHub PR creation command.
 * Logs the operation and increments the corresponding counter if a match is found.
 *
 * @param {string} commandString - The CLI command string to check (e.g., 'git commit', 'gh pr create').
 * @param {number} configFlag - a flag that, if not zero, disables tracking for this invocation.
 * @returns {void}
 */
function trackGitAndPullRequestOperations(commandString, configFlag) {
  // Only proceed if configFlag is zero
  if (configFlag !== 0) return;

  // Check for 'git commit' command
  if (commandString.match(/^\s*git\s+commit\b/)) {
    // Log the git commit operation
    logTelemetryEventIfEnabled("tengu_git_operation", {
      operation: "commit"
    });
    // Increment the git commit operation counter, if available
    _0A()?.add(1);
  }
  // Check for 'gh pr create' command
  else if (commandString.match(/^\s*gh\s+pr\s+create\b/)) {
    // Log the PR creation operation
    logTelemetryEventIfEnabled("tengu_git_operation", {
      operation: "pr_create"
    });
    // Increment the PR creation operation counter, if available
    S0A()?.add(1);
  }
}

module.exports = trackGitAndPullRequestOperations;