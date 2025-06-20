/**
 * Combines the message and error counts from two summary objects.
 *
 * This function takes two summary objects, each containing 'messages' and 'errors' properties,
 * and returns a new object with the total counts for both properties.
 *
 * @param {Object} firstSummary - The first summary object containing message and error counts.
 * @param {number} firstSummary.messages - The number of messages in the first summary.
 * @param {number} firstSummary.errors - The number of errors in the first summary.
 * @param {Object} secondSummary - The second summary object containing message and error counts.
 * @param {number} secondSummary.messages - The number of messages in the second summary.
 * @param {number} secondSummary.errors - The number of errors in the second summary.
 * @returns {Object} An object containing the combined message and error counts.
 */
function combineMessageAndErrorCounts(firstSummary, secondSummary) {
  // Sum the message counts from both summaries
  const totalMessages = firstSummary.messages + secondSummary.messages;
  // Sum the error counts from both summaries
  const totalErrors = firstSummary.errors + secondSummary.errors;

  return {
    messages: totalMessages,
    errors: totalErrors
  };
}

module.exports = combineMessageAndErrorCounts;
