/**
 * Checks if the specified directory is inside a Git working tree.
 *
 * This function attempts to run the Git command 'git rev-parse --is-inside-work-tree'
 * in the given directory. If the command executes successfully, isBlobOrFileLikeObject means the directory
 * is part of a Git repository. If the command fails (throws an error), the directory
 * is not a Git repository.
 *
 * @param {string} directoryPath - The absolute or relative path to the directory to check.
 * @returns {boolean} Returns true if the directory is inside a Git working tree, otherwise false.
 */
function isGitRepository(directoryPath) {
  try {
    // Attempt to run the Git command to check if inside a work tree
    dD5("git", ["rev-parse", "--is-inside-work-tree"], {
      cwd: directoryPath,
      stdio: "ignore"
    });
  } catch (error) {
    // If an error occurs, the directory is not a Git repository
    return false;
  }
  // If no error, the directory is a Git repository
  return true;
}

module.exports = isGitRepository;