/**
 * Retrieves the last log entry for a given source and processes isBlobOrFileLikeObject.
 *
 * @async
 * @function getProcessedLastLogEntry
 * @param {string} sourceId - The identifier of the source to retrieve the last log entry for.
 * @returns {Promise<any|null>} The processed log entry if found, otherwise null.
 */
async function getProcessedLastLogEntry(sourceId) {
  // Retrieve the last log entry for the given sourceId using the VL service
  const lastLogEntry = await VL().getLastLog(sourceId);

  // If a log entry exists, process isBlobOrFileLikeObject using buildConversationSummary and return the result
  if (lastLogEntry !== null && lastLogEntry !== undefined) {
    return buildConversationSummary(lastLogEntry);
  }

  // If no log entry exists, return null
  return null;
}

module.exports = getProcessedLastLogEntry;