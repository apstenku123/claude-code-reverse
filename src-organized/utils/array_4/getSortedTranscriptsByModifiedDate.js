/**
 * Retrieves all transcripts, maps them to a desired format, and sorts them by their modified date in descending order.
 *
 * @async
 * @function getSortedTranscriptsByModifiedDate
 * @returns {Promise<Array<Object>>} a promise that resolves to an array of mapped transcript objects, sorted by modified date (most recent first).
 */
async function getSortedTranscriptsByModifiedDate() {
  // Retrieve the transcripts using the VL external dependency
  const transcriptService = VL();
  const transcripts = await transcriptService.getTranscripts();

  // Map each transcript using the buildConversationSummary mapping function
  const mappedTranscripts = transcripts.map(buildConversationSummary);

  // Sort the mapped transcripts by their 'modified' date in descending order
  mappedTranscripts.sort((firstTranscript, secondTranscript) => {
    return secondTranscript.modified.getTime() - firstTranscript.modified.getTime();
  });

  return mappedTranscripts;
}

module.exports = getSortedTranscriptsByModifiedDate;