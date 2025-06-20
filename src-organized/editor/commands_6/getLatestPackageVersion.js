/**
 * Retrieves the latest version of the @anthropic-ai/claude-code npm package.
 *
 * This function executes the `npm view` command to fetch the latest version
 * of the @anthropic-ai/claude-code package from the npm registry. It returns
 * the version string after trimming whitespace.
 *
 * @async
 * @returns {Promise<string>} The latest version of the package as a string.
 */
async function getLatestPackageVersion() {
  // Define package metadata constants
  const PACKAGE_METADATA = {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
    VERSION: "1.0.19"
  };

  // Compose the npm command arguments to fetch the latest version
  const npmArgs = [
    "view",
    `${PACKAGE_METADATA.PACKAGE_URL}@latest`,
    "version"
  ];

  // Execute the npm command using the JV utility
  // JV is assumed to be an external function that runs shell commands
  const { stdout: npmStdout } = await JV("npm", npmArgs, {
    timeout: 10000, // 10 seconds timeout
    preserveOutputOnError: false
  });

  // Return the trimmed version string
  return npmStdout.trim();
}

module.exports = getLatestPackageVersion;