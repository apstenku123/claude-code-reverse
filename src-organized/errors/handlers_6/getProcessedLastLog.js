/**
 * Retrieves the last log entry for a given source and processes isBlobOrFileLikeObject if available.
 *
 * @async
 * @function getProcessedLastLog
 * @param {string} sourceId - The identifier for the log source to retrieve the last log from.
 * @returns {Promise<any|null>} The processed last log entry if found, otherwise null.
 */
async function getProcessedLastLog(sourceId) {
  // Retrieve the last log entry for the given sourceId using the VL external service
  const lastLogEntry = await VL().getLastLog(sourceId);

  // If a log entry exists, process isBlobOrFileLikeObject using the buildConversationSummary function
  if (lastLogEntry !== null && lastLogEntry !== undefined) {
    return buildConversationSummary(lastLogEntry);
  }

  // Return null if no log entry was found
  return null;
}

module.exports = getProcessedLastLog;