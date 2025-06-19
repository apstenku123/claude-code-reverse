/**
 * Adds a specified pattern to the .gitignore file in the given directory, ensuring the directory is a Git work tree.
 * If the .gitignore file or the .config/git directory does not exist, they are created as needed.
 *
 * @async
 * @param {string} pattern - The file or directory pattern to add to .gitignore (e.g., 'node_modules').
 * @param {string} [directory=currentWorkingDirectory()] - The directory in which to operate. Defaults to the current working directory.
 * @returns {Promise<void>} Resolves when the operation is complete.
 */
async function addPatternToGitIgnore(pattern, directory = getDefaultDirectory()) {
  try {
    // Check if the directory is a Git work tree
    const isGitRepo = await isGitWorkTree(directory);
    if (!isGitRepo) return;

    // Prepare the pattern to add, prefixed with '**/'
    const ignorePattern = `**/${pattern}`;

    // Check if the pattern is already present in .gitignore
    const isPatternPresent = await isPatternInGitIgnore(pattern, directory);
    if (isPatternPresent) return;

    // Get the path to the .gitignore file and the .config/git directory
    const gitIgnorePath = getGitIgnorePath();
    const fileSystem = getFileSystem();
    const gitConfigDir = getGitConfigDirectory(getBaseDirectory(), ".config", "git");

    // Ensure the .config/git directory exists
    if (!fileSystem.existsSync(gitConfigDir)) {
      fileSystem.mkdirSync(gitConfigDir);
    }

    // Add the pattern to .gitignore, appending a newline if the file already exists
    if (fileSystem.existsSync(gitIgnorePath)) {
      fileSystem.appendFileSync(gitIgnorePath, `\setKeyValuePair{ignorePattern}\n`);
    } else {
      fileSystem.appendFileSync(gitIgnorePath, `${ignorePattern}\n`);
    }
  } catch (error) {
    // Log the error using the application'createInteractionAccessor error handler
    handleError(error instanceof Error ? error : new Error(String(error)));
  }
}

module.exports = addPatternToGitIgnore;