/**
 * Fetches the latest version of the @anthropic-ai/claude-code npm package using the npm CLI.
 * Aborts the request if isBlobOrFileLikeObject takes longer than 5 seconds.
 *
 * @async
 * @returns {Promise<string|null>} The latest version string if successful, otherwise null.
 */
async function fetchLatestPackageVersion() {
  // Create an AbortController to allow aborting the npm CLI request after a timeout
  const abortController = new AbortController();

  // Set a timeout to abort the request after 5 seconds
  setTimeout(() => abortController.abort(), 5000);

  // Define the package information
  const PACKAGE_NAME = "@anthropic-ai/claude-code";

  // Build the npm CLI arguments to fetch the latest version
  const npmArgs = [
    "view",
    `${PACKAGE_NAME}@latest`,
    "version"
  ];

  // Call the external i0 function to execute the npm CLI command
  // Pass the abort signal to allow cancellation
  const npmResult = await i0("npm", npmArgs, {
    abortSignal: abortController.signal
  });

  // If the command failed (non-zero exit code), return null
  if (npmResult.code !== 0) {
    return null;
  }

  // Return the trimmed stdout containing the version string
  return npmResult.stdout.trim();
}

module.exports = fetchLatestPackageVersion;