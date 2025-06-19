/**
 * Appends a summary entry to the log or data structure managed by VL().
 *
 * @param {string} leafUuid - The unique identifier for the leaf node to which the summary is attached.
 * @param {string} summaryText - The summary text to be appended.
 * @returns {void} This function does not return a value.
 */
function appendSummaryEntry(leafUuid, summaryText) {
  // Call the VL() external function and append a summary entry with the provided details
  VL().appendEntry({
    type: "summary",
    summary: summaryText,
    leafUuid: leafUuid
  });
}

module.exports = appendSummaryEntry;