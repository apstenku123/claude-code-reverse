/**
 * Checks if the specified directory is inside a Git working tree.
 *
 * @async
 * @function isGitRepository
 * @param {string} directoryPath - The path to the directory to check.
 * @returns {Promise<boolean>} Resolves to true if the directory is inside a Git working tree, false otherwise.
 */
async function isGitRepository(directoryPath) {
  // Execute the git command to check if the directory is inside a Git work tree
  const { code: exitCode } = await JV(
    "git",
    ["rev-parse", "--is-inside-work-tree"],
    {
      preserveOutputOnError: false, // normalizeToError not preserve output if an error occurs
      cwd: directoryPath // Set the working directory for the command
    }
  );
  // If exit code is 0, the directory is inside a Git work tree
  return exitCode === 0;
}

module.exports = isGitRepository;
