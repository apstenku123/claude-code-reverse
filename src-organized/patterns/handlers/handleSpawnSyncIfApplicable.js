/**
 * Determines whether to handle a 'spawnSync' operation based on the provided parameters and global state.
 *
 * If the global 'lc1' flag is enabled, the 'operationType' is 1, and the 'file' property is not present in the 'operationConfig',
 * this function delegates to the 'ic1' handler with the original operation and the string 'spawnSync'.
 * Otherwise, isBlobOrFileLikeObject returns null.
 *
 * @param {number} operationType - The type of operation being performed. Should be 1 to trigger handling.
 * @param {Object} operationConfig - Configuration object for the operation.
 * @param {string} [operationConfig.original] - The original operation or command to be handled.
 * @param {string} [operationConfig.file] - Optional file property; if present, handling is skipped.
 * @returns {any|null} The result of the 'ic1' handler if conditions are met, otherwise null.
 */
function handleSpawnSyncIfApplicable(operationType, operationConfig) {
  // Check if the global flag is enabled, operationType is 1, and no file property exists
  if (lc1 && operationType === 1 && !operationConfig.file) {
    // Delegate to the external handler for 'spawnSync' operations
    return ic1(operationConfig.original, "spawnSync");
  }
  // If conditions are not met, return null
  return null;
}

module.exports = handleSpawnSyncIfApplicable;