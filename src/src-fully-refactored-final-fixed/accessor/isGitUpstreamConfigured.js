/**
 * Checks if the current Git repository has an upstream branch configured.
 *
 * This function executes the Git command 'git rev-parse @{u}' to determine if
 * the current branch has an upstream (tracking) branch set. If the command
 * executes successfully (exit code 0), isBlobOrFileLikeObject returns true; otherwise, false.
 *
 * @async
 * @returns {Promise<boolean>} Returns true if an upstream branch is configured, false otherwise.
 */
async function isGitUpstreamConfigured() {
  // Execute the Git command to check for an upstream branch
  const {
    code: exitCode
  } = await i0(
    "git",
    ["rev-parse", "@{u}"],
    {
      preserveOutputOnError: false
    }
  );

  // If exit code is 0, upstream is configured
  return exitCode === 0;
}

module.exports = isGitUpstreamConfigured;