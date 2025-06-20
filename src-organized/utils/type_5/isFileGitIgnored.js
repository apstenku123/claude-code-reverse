/**
 * Checks if a given file path is ignored by Git in the specified working directory.
 *
 * @async
 * @param {string} filePath - The path to the file to check for Git ignore status.
 * @param {string} workingDirectory - The directory in which to run the Git command.
 * @returns {Promise<boolean>} Returns true if the file is ignored by Git, false otherwise.
 */
async function isFileGitIgnored(filePath, workingDirectory) {
  // Run the 'git check-ignore' command for the specified file in the given directory
  const { code: exitCode } = await JV(
    "git",
    ["check-ignore", filePath],
    {
      preserveOutputOnError: false,
      cwd: workingDirectory
    }
  );

  // If exit code is 0, the file is ignored by Git
  return exitCode === 0;
}

module.exports = isFileGitIgnored;