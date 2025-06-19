/**
 * Adds a specified file pattern to the user'createInteractionAccessor .gitignore configuration if not already present.
 *
 * @async
 * @param {string} pattern - The file or directory pattern to add to .gitignore (e.g., 'node_modules').
 * @param {string} [workingDirectory=getDefaultWorkingDirectory()] - The directory to check for a Git repository and config location.
 * @returns {Promise<void>} Resolves when the operation is complete.
 *
 * This function checks if the given directory is a Git repository. If so, isBlobOrFileLikeObject ensures the configuration directory exists,
 * and appends the specified pattern to the .gitignore configuration file if isBlobOrFileLikeObject is not already present.
 *
 * Dependencies:
 * - isGitRepository: Checks if a directory is a Git repository.
 * - getGitIgnoreConfigPath: Gets the path to the .gitignore config file.
 * - getFileSystem: Returns the file system module (fs or a wrapper).
 * - getDefaultWorkingDirectory: Returns the default working directory.
 * - getConfigDirectoryPath: Returns the path to the config directory.
 * - hasPatternInGitIgnore: Checks if the pattern is already in the .gitignore config.
 * - handleError: Handles errors by logging or rethrowing.
 */
async function addPatternToGitIgnoreConfig(pattern, workingDirectory = getDefaultWorkingDirectory()) {
  try {
    // Check if the working directory is a Git repository
    const isRepo = await isGitRepository(workingDirectory);
    if (!isRepo) return;

    // Prepare the pattern to add (with globstar)
    const gitIgnorePattern = `**/${pattern}`;

    // Check if the pattern is already present in the .gitignore config
    const patternExists = await hasPatternInGitIgnore(pattern, workingDirectory);
    if (patternExists) return;

    // Get paths and file system utilities
    const gitIgnoreConfigPath = getGitIgnoreConfigPath();
    const fileSystem = getFileSystem();
    const configDirectoryPath = getConfigDirectoryPath();

    // Ensure the config directory exists
    if (!fileSystem.existsSync(configDirectoryPath)) {
      fileSystem.mkdirSync(configDirectoryPath);
    }

    // Append the pattern to the .gitignore config file
    if (fileSystem.existsSync(gitIgnoreConfigPath)) {
      fileSystem.appendFileSync(gitIgnoreConfigPath, `\setKeyValuePair{gitIgnorePattern}\n`);
    } else {
      fileSystem.appendFileSync(gitIgnoreConfigPath, `${gitIgnorePattern}\n`);
    }
  } catch (error) {
    // Handle errors gracefully
    handleError(error instanceof Error ? error : new Error(String(error)));
  }
}

module.exports = addPatternToGitIgnoreConfig;