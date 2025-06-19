/**
 * Appends a given pattern to the .gitignore file in the configuration directory, ensuring the directory exists.
 * Skips the operation if the pattern is already ignored or if the configuration is not valid.
 * Handles errors gracefully and logs them.
 *
 * @async
 * @param {string} pattern - The file or directory pattern to ignore (e.g., 'node_modules').
 * @param {object} [config=getDefaultConfig()] - Optional configuration object. If not provided, uses the default config.
 * @returns {Promise<void>} Resolves when the operation is complete.
 */
async function appendGitIgnorePattern(pattern, config = getDefaultConfig()) {
  try {
    // Check if the configuration is valid before proceeding
    const isConfigValid = await isConfigAvailable(config);
    if (!isConfigValid) return;

    // Prepare the ignore pattern to be appended
    const ignorePattern = `**/${pattern}`;

    // Check if the pattern is already ignored
    const isAlreadyIgnored = await isPatternAlreadyIgnored(pattern, config);
    if (isAlreadyIgnored) return;

    // Get the path to the .gitignore file and the file system utilities
    const gitIgnorePath = getGitIgnoreFilePath();
    const fileSystem = getFileSystem();
    const configDirectory = getConfigDirectoryPath(getRootDirectory(), ".config", "git");

    // Ensure the .config/git directory exists
    if (!fileSystem.existsSync(configDirectory)) {
      fileSystem.mkdirSync(configDirectory);
    }

    // Append the ignore pattern to the .gitignore file
    if (fileSystem.existsSync(gitIgnorePath)) {
      fileSystem.appendFileSync(gitIgnorePath, `\setKeyValuePair{ignorePattern}\n`);
    } else {
      fileSystem.appendFileSync(gitIgnorePath, `${ignorePattern}\n`);
    }
  } catch (error) {
    // Log any errors encountered during the process
    logError(error instanceof Error ? error : new Error(String(error)));
  }
}

module.exports = appendGitIgnorePattern;