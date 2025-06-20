/**
 * Retrieves the current version of the Claude Code package.
 *
 * @async
 * @returns {Promise<string>} The current version string of the package.
 */
async function getPackageVersion() {
  // Package metadata object
  const packageMetadata = {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
    VERSION: "1.0.19"
  };

  // Return the version property from the metadata
  return packageMetadata.VERSION;
}

module.exports = getPackageVersion;
