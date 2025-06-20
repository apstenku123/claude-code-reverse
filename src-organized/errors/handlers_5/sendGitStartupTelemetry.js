/**
 * Sends telemetry data about the current Git repository on application startup.
 *
 * This function concurrently checks if the current directory is a Git repository and counts the number of Git worktrees.
 * It then sends this information as telemetry using the 'logTelemetryEventIfEnabled' function under the event name 'tengu_startup_telemetry'.
 *
 * @async
 * @returns {Promise<void>} Resolves when telemetry has been sent.
 */
async function sendGitStartupTelemetry() {
  // Run both checks concurrently: isGitRepo and worktreeCount
  const [isGitRepository, worktreeCount] = await Promise.all([
    FV(), // Checks if the current directory is a Git repository
    getGitWorktreeCount() // Counts the number of Git worktrees
  ]);

  // Send telemetry event with the gathered data
  logTelemetryEventIfEnabled("tengu_startup_telemetry", {
    is_git: isGitRepository,
    worktree_count: worktreeCount
  });
}

module.exports = sendGitStartupTelemetry;