/**
 * Adds a summary entry to the log using the provided summary text and leaf UUID.
 *
 * @param {string} leafUuid - The unique identifier for the leaf node to associate with the summary entry.
 * @param {string} summaryText - The summary text to be added to the log entry.
 * @returns {void}
 */
function addSummaryEntry(leafUuid, summaryText) {
  // Append a new summary entry to the log with the specified details
  VL().appendEntry({
    type: "summary",
    summary: summaryText,
    leafUuid: leafUuid
  });
}

module.exports = addSummaryEntry;