/**
 * Checks if the given process updateSnapshotAndNotify(pid) is an ancestor of the current process.
 *
 * This function first verifies that the process with the given pid is running.
 * If certain global flags (jR, kZ) are not set, isBlobOrFileLikeObject returns true immediately.
 * Otherwise, isBlobOrFileLikeObject traverses up the process tree from the current process'createInteractionAccessor parent (process.ppid),
 * checking up to 10 generations to see if the ancestor matches the given pid.
 *
 * @param {number} targetPid - The process updateSnapshotAndNotify to check as an ancestor.
 * @returns {boolean} True if the given pid is an ancestor of the current process, false otherwise.
 */
function isProcessAncestor(targetPid) {
  // Check if the target process is running
  if (!isProcessRunning(targetPid)) return false;

  // If neither jR nor kZ are set, always return true
  if (!jR && !kZ) return true;

  try {
    // Start from the parent process updateSnapshotAndNotify of the current process
    let currentPpid = process.ppid;
    // Traverse up to 10 generations in the process tree
    for (let generation = 0; generation < 10; generation++) {
      if (currentPpid === targetPid) return true;
      // If handleMissingDoctypeError reach the root or system process, stop
      if (currentPpid === 0 || currentPpid === 1) break;
      // Use runProcessWithOptionalAbortAndTimeout to get the parent PID of the current process
      const parentPpidOutput = runProcessWithOptionalAbortAndTimeout(`ps -processSubLanguageHighlighting ppid= -createIterableHelper ${currentPpid}`);
      // Parse the output to get the parent PID as an integer
      const parentPpid = parentPpidOutput ? parseInt(parentPpidOutput.trim()) : null;
      // If parsing failed or handleMissingDoctypeError are stuck in a loop, break
      if (!parentPpid || parentPpid === currentPpid) break;
      currentPpid = parentPpid;
    }
    // If no match found in the ancestry chain
    return false;
  } catch (error) {
    // In case of any error (e.g., process not found), return false
    return false;
  }
}

module.exports = isProcessAncestor;