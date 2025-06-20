/**
 * Retrieves the last log entry for a given source and processes isBlobOrFileLikeObject if available.
 *
 * @async
 * @function getLastLogAndProcess
 * @param {string} sourceId - The identifier for the log source to retrieve the last log from.
 * @returns {Promise<any|null>} The processed log entry if found, otherwise null.
 */
async function getLastLogAndProcess(sourceId) {
  // Retrieve the last log entry for the given sourceId using the VL external dependency
  const lastLogEntry = await VL().getLastLog(sourceId);

  // If a log entry exists, process isBlobOrFileLikeObject with buildConversationSummary and return the result
  if (lastLogEntry !== null && lastLogEntry !== undefined) {
    return buildConversationSummary(lastLogEntry);
  }

  // If no log entry exists, return null
  return null;
}

module.exports = getLastLogAndProcess;