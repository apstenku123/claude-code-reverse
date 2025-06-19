/**
 * Sends telemetry data about the current Git repository at application startup.
 *
 * This function gathers information about whether the current directory is a Git repository
 * and counts the number of Git worktrees. It then sends this data as telemetry using the
 * 'tengu_startup_telemetry' event.
 *
 * @async
 * @function sendStartupGitTelemetry
 * @returns {Promise<void>} Resolves when telemetry has been sent.
 */
async function sendStartupGitTelemetry() {
  // Run both checks in parallel: isGitRepository and getGitWorktreeCount
  const [isGitRepository, worktreeCount] = await Promise.all([
    FV(), // Returns true if current directory is a Git repository
    getGitWorktreeCount() // Returns the number of Git worktrees
  ]);

  // Send telemetry event with gathered data
  logTelemetryEventIfEnabled("tengu_startup_telemetry", {
    is_git: isGitRepository,
    worktree_count: worktreeCount
  });
}

module.exports = sendStartupGitTelemetry;