/**
 * Merges the message and error counts from two summary objects.
 *
 * @param {Object} firstSummary - The first summary object containing message and error counts.
 * @param {number} firstSummary.messages - The number of messages in the first summary.
 * @param {number} firstSummary.errors - The number of errors in the first summary.
 * @param {Object} secondSummary - The second summary object containing message and error counts.
 * @param {number} secondSummary.messages - The number of messages in the second summary.
 * @param {number} secondSummary.errors - The number of errors in the second summary.
 * @returns {Object} An object containing the total messages and errors from both summaries.
 */
function mergeMessageAndErrorCounts(firstSummary, secondSummary) {
  // Sum the messages and errors from both summary objects
  return {
    messages: firstSummary.messages + secondSummary.messages,
    errors: firstSummary.errors + secondSummary.errors
  };
}

module.exports = mergeMessageAndErrorCounts;
