/**
 * Extracts content from files and directories mentioned in the provided source, using the given configuration.
 * For each mention, determines if isBlobOrFileLikeObject'createInteractionAccessor a directory or file, processes accordingly, and returns an array of results.
 *
 * @param {any} mentionsSource - The source containing file/directory mentions to extract.
 * @param {any} extractionConfig - Configuration object for extraction (passed to downstream functions).
 * @returns {Promise<Array<Object>>} Array of extraction results for each mention (files and directories), excluding nulls.
 */
async function extractMentionedFilesAndDirectories(mentionsSource, extractionConfig) {
  // Get the list of mention objects from the source
  const mentionList = KD5(mentionsSource);

  // Process all mentions in parallel
  const extractionResults = await Promise.all(
    mentionList.map(async (mention) => {
      try {
        // Destructure mention details (filename, lineStart, lineEnd)
        const {
          filename: mentionFilename,
          lineStart: lineStart,
          lineEnd: lineEnd
        } = parseFilenameWithLineRange(mention);

        // Resolve the absolute path for the mention
        const mentionPath = f3(mentionFilename);

        try {
          // Check if the path is a directory
          if (getBm9Value().statSync(mentionPath).isDirectory()) {
            // Prepare context for directory extraction
            const directoryContext = { path: mentionPath };
            // Extract directory content
            const directoryContent = await getLastItemFromAsyncIterable(GC.call(directoryContext, extractionConfig));
            // Log directory extraction success
            logTelemetryEventIfEnabled("tengu_at_mention_extracting_directory_success", {});
            // Return directory extraction result
            return {
              type: "new_directory",
              path: mentionPath,
              content: directoryContent.data
            };
          }
        } catch {
          // Ignore errors when checking/reading directory
        }

        // If not a directory, extract file content with validation
        return await fetchFileContentWithValidation(
          mentionPath,
          extractionConfig,
          "tengu_at_mention_extracting_filename_success",
          "tengu_at_mention_extracting_filename_error",
          {
            offset: lineStart,
            limit: lineEnd && lineStart ? lineEnd - lineStart + 1 : undefined
          }
        );
      } catch {
        // Log file extraction error
        logTelemetryEventIfEnabled("tengu_at_mention_extracting_filename_error", {});
      }
      // If all fails, return null (will be filtered out)
      return null;
    })
  );

  // Filter out any null results (failed extractions)
  return extractionResults.filter(result => result !== null);
}

module.exports = extractMentionedFilesAndDirectories;