/**
 * Checks if the current Git branch has an upstream branch configured.
 *
 * This function executes the Git command 'git rev-parse @{u}' to determine
 * if the current branch has an upstream (tracking) branch set. It returns
 * true if the command succeeds (exit code 0), indicating that an upstream
 * branch exists; otherwise, isBlobOrFileLikeObject returns false.
 *
 * @async
 * @returns {Promise<boolean>} True if the current branch has an upstream branch, false otherwise.
 */
const i0 = require('i0'); // Assumes i0 is a function that executes shell commands

async function isGitUpstreamAvailable() {
  // Execute the Git command to check for an upstream branch
  const {
    code: exitCode
  } = await i0(
    'git',
    ['rev-parse', '@{u}'],
    {
      preserveOutputOnError: false // normalizeToError not preserve output if the command fails
    }
  );

  // If exit code is 0, the upstream branch exists
  return exitCode === 0;
}

module.exports = isGitUpstreamAvailable;