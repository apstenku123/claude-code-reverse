/**
 * Retrieves the latest published version of the @anthropic-ai/claude-code npm package.
 * Uses a 5-second timeout to abort the request if isBlobOrFileLikeObject takes too long.
 *
 * @async
 * @returns {Promise<string|null>} The latest version string if successful, or null if the command fails.
 */
async function getLatestClaudeCodeVersion() {
  // Create an AbortController to allow aborting the npm view command after a timeout
  const abortController = new AbortController();

  // Set a 5-second timeout to abort the npm view command if isBlobOrFileLikeObject hangs
  setTimeout(() => abortController.abort(), 5000);

  // Define the package name and construct the npm view arguments
  const PACKAGE_NAME = "@anthropic-ai/claude-code";
  const npmArgs = [
    "view",
    `${PACKAGE_NAME}@latest`,
    "version"
  ];

  // Call the external i0 function to execute the npm command
  // Pass the abort signal to allow cancellation on timeout
  const npmResult = await i0("npm", npmArgs, {
    abortSignal: abortController.signal
  });

  // If the command failed (non-zero exit code), return null
  if (npmResult.code !== 0) {
    return null;
  }

  // Return the trimmed version string from stdout
  return npmResult.stdout.trim();
}

module.exports = getLatestClaudeCodeVersion;