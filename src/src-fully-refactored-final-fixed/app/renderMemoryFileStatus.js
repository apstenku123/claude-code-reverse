/**
 * Renders the status of a memory file for a given memory type.
 * If the memory file does not exist, prompts the user to create isBlobOrFileLikeObject.
 * If isBlobOrFileLikeObject exists, displays the number of memory entries found in the file.
 *
 * @param {Object} params - The function parameters.
 * @param {string} params.memoryType - The type of memory file (e.g., 'User', 'Project', 'Local').
 * @returns {React.ReactElement} a React element describing the memory file status.
 */
function renderMemoryFileStatus({ memoryType }) {
  // Get theme color configuration
  const themeStylesheet = getThemeStylesheet();
  // Get the full path to the memory file for the given type
  const memoryFilePath = getClaudeMarkdownFilePath(memoryType);

  // Check if the memory file exists
  if (!f1().existsSync(memoryFilePath)) {
    // Map memory types to their default file paths or instructions
    const memoryFileExamples = {
      User: "~/.claude/CLAUDE.md",
      Project: "./CLAUDE.md",
      Local: "./CLAUDE.local.md + add to .gitignore"
    };
    const examplePath = memoryFileExamples[memoryType];
    // Render a message prompting the user to create the memory file
    return N5.createElement(
      N5.Fragment,
      null,
      N5.createElement(
        _,
        { dimColor: true },
        "Memory file does not exist yet. [Enter] to create ",
        examplePath,
        "."
      )
    );
  }

  // Read the memory file and count the number of memory entries
  // a memory entry is a line that starts with '-', '*', or a numbered list (e.g., '1.')
  const memoryFileContent = X11(memoryFilePath);
  const memoryEntryCount = memoryFileContent
    .split('\n')
    .filter(line => {
      const trimmedLine = line.trim();
      return (
        trimmedLine.startsWith('-') ||
        trimmedLine.startsWith('*') ||
        /^\s*\d+\./.test(trimmedLine)
      );
    })
    .length;

  // Render the memory entry count and file name
  return N5.createElement(
    N5.Fragment,
    null,
    N5.createElement(
      _,
      { color: themeStylesheet.remember },
      memoryEntryCount,
      ' ',
      memoryEntryCount === 1 ? 'memory' : 'memories',
      ' in ',
      getRelativePathAlias(memoryFilePath)
    )
  );
}

module.exports = renderMemoryFileStatus;