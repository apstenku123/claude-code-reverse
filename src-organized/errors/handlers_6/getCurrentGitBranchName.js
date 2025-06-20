/**
 * Retrieves the current Git branch name by executing a Git command.
 *
 * @async
 * @function getCurrentGitBranchName
 * @returns {Promise<string>} The name of the current Git branch, trimmed of whitespace.
 * @throws Will throw if the git command fails.
 */
async function getCurrentGitBranchName() {
  // Execute the git command to get the current branch name
  const { stdout: gitOutput } = await i0(
    "git",
    ["rev-parse", "--abbrev-ref", "HEAD"],
    {
      preserveOutputOnError: false // normalizeToError not preserve output if an error occurs
    }
  );

  // Trim any leading/trailing whitespace from the branch name
  return gitOutput.trim();
}

module.exports = getCurrentGitBranchName;