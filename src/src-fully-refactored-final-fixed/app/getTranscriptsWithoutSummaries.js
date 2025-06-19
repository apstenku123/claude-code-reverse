/**
 * Retrieves all transcripts that do not have a corresponding summary.
 *
 * This function fetches both transcripts and summaries asynchronously, then filters out any transcript
 * whose latest entry'createInteractionAccessor UUID exists in the set of summary UUIDs.
 *
 * @async
 * @returns {Promise<Array>} An array of transcript arrays that do not have a summary.
 */
async function getTranscriptsWithoutSummaries() {
  // Fetch transcripts and summaries concurrently
  const [transcripts, summaries] = await Promise.all([
    VL().getTranscripts(),
    VL().getSummaries()
  ]);

  // Filter transcripts: keep only those whose latest entry'createInteractionAccessor UUID is not in the summaries set
  return transcripts.filter(transcriptEntries => {
    // Get the last entry in the transcript array
    const lastEntry = transcriptEntries[transcriptEntries.length - 1];
    // Exclude if the summary set contains the UUID of the last transcript entry
    return !summaries.has(lastEntry.uuid);
  });
}

module.exports = getTranscriptsWithoutSummaries;