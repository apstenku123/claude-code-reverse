/**
 * Checks if a given file or directory path is ignored by Git in the specified working directory.
 *
 * @async
 * @param {string} filePath - The path to the file or directory to check.
 * @param {string} workingDirectory - The directory in which to run the git check.
 * @returns {Promise<boolean>} - Returns true if the path is ignored by Git, false otherwise.
 */
async function isPathGitIgnored(filePath, workingDirectory) {
  // Run the 'git check-ignore' command for the given filePath in the specified workingDirectory
  const { code: exitCode } = await JV(
    "git",
    ["check-ignore", filePath],
    {
      preserveOutputOnError: false,
      cwd: workingDirectory
    }
  );
  // If exit code is 0, the path is ignored by Git
  return exitCode === 0;
}

module.exports = isPathGitIgnored;