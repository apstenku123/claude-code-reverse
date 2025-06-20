/**
 * Retrieves the latest published version of the specified NPM package.
 *
 * @async
 * @function getLatestNpmPackageVersion
 * @returns {Promise<string>} The latest version string of the NPM package.
 *
 * @throws Will throw if the JV command fails or times out.
 */
async function getLatestNpmPackageVersion() {
  // Define the package metadata
  const PACKAGE_METADATA = {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
    VERSION: "1.0.19"
  };

  // Use the PACKAGE_URL from the metadata to construct the npm view command
  const packageName = PACKAGE_METADATA.PACKAGE_URL;
  const npmArgs = [
    "view",
    `${packageName}@latest`,
    "version"
  ];

  // Execute the npm command using the JV utility
  // JV is assumed to be an external async function that runs shell commands
  const { stdout: npmStdout } = await JV("npm", npmArgs, {
    timeout: 10000, // 10 seconds timeout
    preserveOutputOnError: false
  });

  // Return the trimmed version string
  return npmStdout.trim();
}

module.exports = getLatestNpmPackageVersion;