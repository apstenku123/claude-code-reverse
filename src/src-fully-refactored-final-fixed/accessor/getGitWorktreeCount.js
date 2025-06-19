/**
 * Retrieves the number of Git worktrees in the current repository.
 *
 * This function executes the 'git worktree list' command and counts the number of worktrees
 * by splitting the output into lines. If the command fails or returns a non-zero exit code,
 * the function returns 0.
 *
 * @async
 * @returns {Promise<number>} The number of Git worktrees, or 0 if the command fails.
 */
async function getGitWorktreeCount() {
  try {
    // Execute the 'git worktree list' command
    const {
      stdout: worktreeListOutput,
      code: exitCode
    } = await i0("git", ["worktree", "list"], {
      preserveOutputOnError: false
    });

    // If the command failed, return 0
    if (exitCode !== 0) {
      return 0;
    }

    // Count the number of lines in the output (each line represents a worktree)
    return worktreeListOutput.trim().split('\n').length;
  } catch (error) {
    // If an error occurs, return 0
    return 0;
  }
}

module.exports = getGitWorktreeCount;