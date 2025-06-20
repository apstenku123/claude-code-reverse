/**
 * Extracts content from files or directories mentioned in the given source, handling directories and files differently.
 * For directories, isBlobOrFileLikeObject recursively extracts their content. For files, isBlobOrFileLikeObject fetches content with validation and offset/limit support.
 * Reports success or error events for each extraction.
 *
 * @param {any} sourceObservable - The source object or observable containing file/directory mentions to extract.
 * @param {any} config - Configuration or context used during extraction and validation.
 * @returns {Promise<Array<Object>>} Resolves to an array of extraction results for each mention (file or directory).
 */
async function extractMentionedFilesOrDirectories(sourceObservable, config) {
  // Get all file/directory mention objects from the source
  const mentionList = KD5(sourceObservable);

  // Process each mention in parallel
  const extractionResults = await Promise.all(
    mentionList.map(async (mention) => {
      try {
        // Destructure mention details: filename, lineStart, lineEnd
        const {
          filename,
          lineStart,
          lineEnd
        } = parseFilenameWithLineRange(mention);

        // Resolve the absolute file/directory path
        const absolutePath = f3(filename);

        try {
          // Check if the path is a directory
          if (f1().statSync(absolutePath).isDirectory()) {
            // Prepare context for recursive extraction
            const directoryContext = { path: absolutePath };
            // Recursively extract directory content
            const directoryContent = await getLastItemFromAsyncIterable(GC.call(directoryContext, config));
            // Report directory extraction success
            logTelemetryEventIfEnabled("tengu_at_mention_extracting_directory_success", {});
            return {
              type: "new_directory",
              path: absolutePath,
              content: directoryContent.data
            };
          }
        } catch {
          // Ignore errors when checking directory status
        }

        // If not a directory, extract file content with validation
        return await fetchFileContentWithValidation(
          absolutePath,
          config,
          "tengu_at_mention_extracting_filename_success",
          "tengu_at_mention_extracting_filename_error",
          {
            offset: lineStart,
            limit: lineEnd && lineStart ? lineEnd - lineStart + 1 : undefined
          }
        );
      } catch {
        // Report file extraction error
        logTelemetryEventIfEnabled("tengu_at_mention_extracting_filename_error", {});
      }
      // If extraction fails, return null (filtered out later)
      return null;
    })
  );

  // Filter out any null results (failed extractions)
  return extractionResults.filter(result => result !== null);
}

module.exports = extractMentionedFilesOrDirectories;