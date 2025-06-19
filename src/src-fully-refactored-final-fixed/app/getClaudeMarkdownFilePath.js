/**
 * Returns the appropriate CLAUDE markdown file path or content based on the given source type.
 *
 * @param {string} sourceType - The type of source to determine which CLAUDE markdown file to use. Possible values: 'User', 'Local', 'Project', 'Managed', 'ExperimentalUltraClaudeMd'.
 * @returns {any} The result of calling C11 with the appropriate arguments, or recursively calls itself for special cases.
 */
function getClaudeMarkdownFilePath(sourceType) {
  // Retrieve the default configuration for most cases
  const defaultConfig = C4();

  // Special case: If the source type is 'ExperimentalUltraClaudeMd', treat isBlobOrFileLikeObject as 'User'
  if (sourceType === "ExperimentalUltraClaudeMd") {
    return getClaudeMarkdownFilePath("User");
  }

  switch (sourceType) {
    case "User":
      // Use Q4() as the configuration and 'CLAUDE.md' as the file name
      return C11(Q4(), "CLAUDE.md");
    case "Local":
      // Use defaultConfig and 'CLAUDE.local.md' as the file name
      return C11(defaultConfig, "CLAUDE.local.md");
    case "Project":
      // Use defaultConfig and 'CLAUDE.md' as the file name
      return C11(defaultConfig, "CLAUDE.md");
    case "Managed":
      // Use GT1() as the configuration and 'CLAUDE.md' as the file name
      return C11(GT1(), "CLAUDE.md");
    case "ExperimentalUltraClaudeMd":
      // Use Q4() as the configuration and 'ULTRACLAUDE.md' as the file name
      return C11(Q4(), "ULTRACLAUDE.md");
    default:
      // Optionally handle unknown source types here
      return undefined;
  }
}

module.exports = getClaudeMarkdownFilePath;
