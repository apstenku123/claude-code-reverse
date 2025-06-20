/**
 * Checks if the specified directory is inside a Git working tree.
 *
 * @async
 * @function isGitWorkTree
 * @param {string} directoryPath - The absolute or relative path to the directory to check.
 * @returns {Promise<boolean>} Returns true if the directory is inside a Git working tree, false otherwise.
 */
async function isGitWorkTree(directoryPath) {
  // Execute the git command to check if the directory is inside a work tree
  const { code: exitCode } = await JV(
    "git",
    ["rev-parse", "--is-inside-work-tree"],
    {
      preserveOutputOnError: false,
      cwd: directoryPath
    }
  );
  // If exit code is 0, the directory is inside a Git work tree
  return exitCode === 0;
}

module.exports = isGitWorkTree;
