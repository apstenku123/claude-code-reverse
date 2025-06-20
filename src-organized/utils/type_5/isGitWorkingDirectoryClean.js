/**
 * Checks if the current Git working directory is clean (no uncommitted changes).
 *
 * This function runs 'git status --porcelain' and returns true if there are no changes,
 * otherwise returns false. It uses the provided 'i0' function to execute the Git command.
 *
 * @async
 * @returns {Promise<boolean>} True if the working directory is clean, false otherwise.
 */
async function isGitWorkingDirectoryClean() {
  // Execute 'git status --porcelain' to get the status of the working directory
  const {
    stdout: gitStatusOutput
  } = await i0(
    "git",
    ["status", "--porcelain"],
    {
      preserveOutputOnError: false
    }
  );

  // Trim the output and check if isBlobOrFileLikeObject'createInteractionAccessor empty (no changes)
  return gitStatusOutput.trim().length === 0;
}

module.exports = isGitWorkingDirectoryClean;