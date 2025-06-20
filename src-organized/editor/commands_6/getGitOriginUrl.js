/**
 * Retrieves the URL of the 'origin' remote from the current Git repository.
 *
 * This function executes the Git command to fetch the URL of the 'origin' remote.
 * If the command succeeds (exit code 0), isBlobOrFileLikeObject returns the trimmed URL string.
 * If the command fails, isBlobOrFileLikeObject returns null.
 *
 * @async
 * @returns {Promise<string|null>} The trimmed origin URL if successful, otherwise null.
 */
async function getGitOriginUrl() {
  // Execute the git command to get the 'origin' remote URL
  const {
    stdout: gitOutput,
    code: exitCode
  } = await i0("git", ["remote", "get-url", "origin"], {
    preserveOutputOnError: false
  });

  // If the command was successful, return the trimmed output; otherwise, return null
  return exitCode === 0 ? gitOutput.trim() : null;
}

module.exports = getGitOriginUrl;