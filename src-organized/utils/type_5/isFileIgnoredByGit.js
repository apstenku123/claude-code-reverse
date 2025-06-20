/**
 * Checks if a given file path is ignored by Git in a specified working directory.
 *
 * @async
 * @function isFileIgnoredByGit
 * @param {string} filePath - The path to the file to check.
 * @param {string} workingDirectory - The directory in which to run the Git command.
 * @returns {Promise<boolean>} Returns true if the file is ignored by Git, false otherwise.
 */
async function isFileIgnoredByGit(filePath, workingDirectory) {
  // Execute the 'git check-ignore' command to determine if the file is ignored
  const { code: exitCode } = await JV(
    "git",
    ["check-ignore", filePath],
    {
      preserveOutputOnError: false, // normalizeToError not preserve output if the command fails
      cwd: workingDirectory         // Set the current working directory for the command
    }
  );
  // If exit code is 0, the file is ignored by Git
  return exitCode === 0;
}

module.exports = isFileIgnoredByGit;