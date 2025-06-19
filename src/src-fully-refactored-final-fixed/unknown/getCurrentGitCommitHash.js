/**
 * Retrieves the current Git commit hash from the repository.
 *
 * This function executes the Git command 'git rev-parse HEAD' to obtain
 * the hash of the latest commit in the current working directory.
 *
 * @async
 * @function getCurrentGitCommitHash
 * @returns {Promise<string>} The current Git commit hash as a trimmed string.
 */
async function getCurrentGitCommitHash() {
  // Execute the Git command to get the current commit hash
  const { stdout: gitCommitHash } = await i0("git", ["rev-parse", "HEAD"]);
  // Remove any leading/trailing whitespace from the commit hash
  return gitCommitHash.trim();
}

module.exports = getCurrentGitCommitHash;