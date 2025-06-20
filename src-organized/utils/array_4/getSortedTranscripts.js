/**
 * Retrieves all transcripts, maps them to a new structure using the transcriptMapper function,
 * and returns them sorted in descending order by their 'modified' timestamp.
 *
 * @async
 * @function getSortedTranscripts
 * @returns {Promise<Array<Object>>} a promise that resolves to an array of mapped transcript objects, sorted by modification date (most recent first).
 */
async function getSortedTranscripts() {
  // Retrieve the transcripts from the external source (VL)
  const transcripts = await VL().getTranscripts();

  // Map each transcript using the transcriptMapper function
  const mappedTranscripts = transcripts.map(transcriptMapper);

  // Sort the mapped transcripts by their 'modified' date in descending order
  mappedTranscripts.sort((firstTranscript, secondTranscript) => {
    return secondTranscript.modified.getTime() - firstTranscript.modified.getTime();
  });

  return mappedTranscripts;
}

module.exports = getSortedTranscripts;