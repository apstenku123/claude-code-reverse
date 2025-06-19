/**
 * Retrieves the current Git repository status, including commit hash, branch name, remote URL, 
 * whether the HEAD is on the remote, if the working tree is clean, and the number of worktrees.
 *
 * @async
 * @function getGitRepositoryStatus
 * @returns {Promise<null|{
 *   commitHash: string,
 *   branchName: string,
 *   remoteUrl: string,
 *   isHeadOnRemote: boolean,
 *   isClean: boolean,
 *   worktreeCount: number
 * }>} An object with Git repository status information, or null if an error occurs.
 */
async function getGitRepositoryStatus() {
  try {
    // Run all Git status queries in parallel for efficiency
    const [
      commitHash,
      branchName,
      remoteUrl,
      isHeadOnRemote,
      isClean,
      worktreeCount
    ] = await Promise.all([
      As9(),            // Gets the current commit hash
      Bs9(),            // Gets the current branch name
      Qs9(),            // Gets the remote repository URL
      isGitUpstreamAvailable(),            // Checks if HEAD is on the remote branch
      Gs9(),            // Checks if the working tree is clean
      qi()              // Gets the number of worktrees
    ]);

    return {
      commitHash,
      branchName,
      remoteUrl,
      isHeadOnRemote,
      isClean,
      worktreeCount
    };
  } catch (error) {
    // If any of the above operations fail, return null
    return null;
  }
}

module.exports = getGitRepositoryStatus;