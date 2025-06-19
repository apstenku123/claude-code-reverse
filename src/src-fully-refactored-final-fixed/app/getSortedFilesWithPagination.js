/**
 * Retrieves a paginated, sorted list of files from a directory, applying ignore patterns and supporting cancellation.
 *
 * @param {string} globPattern - The glob pattern to match files against.
 * @param {string} directoryPath - The directory in which to search for files.
 * @param {Object} pagination - Pagination options.
 * @param {number} pagination.limit - Maximum number of files to return.
 * @param {number} pagination.offset - Number of files to skip from the start.
 * @param {AbortSignal} abortSignal - Signal to support cancellation of the operation.
 * @param {Array<string>} ignorePatterns - List of patterns to ignore during file search.
 * @returns {Promise<{ files: string[], truncated: boolean }>} An object containing the paginated file paths and a flag indicating if more files are available.
 */
async function getSortedFilesWithPagination(
  globPattern,
  directoryPath,
  { limit, offset },
  abortSignal,
  ignorePatterns
) {
  // Generate ignore rules based on ignorePatterns and directoryPath
  const ignoreRules = collectPatternMatches(buildProjectReadAccessMap(ignorePatterns), directoryPath);

  // Retrieve matching files with stats and directory entries, applying ignore rules
  const matchedFiles = await f61([globPattern], {
    cwd: directoryPath,
    nocase: true,
    nodir: true,
    signal: abortSignal,
    stat: true,
    withFileTypes: true,
    ignore: ignoreRules
  });

  // Sort files by modification time (oldest first)
  const sortedFiles = matchedFiles.sort((fileA, fileB) => (fileA.mtimeMs ?? 0) - (fileB.mtimeMs ?? 0));

  // Determine if there are more files beyond the requested page
  const isTruncated = sortedFiles.length > offset + limit;

  // Slice the sorted files for pagination and map to their full paths
  const paginatedFiles = sortedFiles.slice(offset, offset + limit).map(file => file.fullpath());

  return {
    files: paginatedFiles,
    truncated: isTruncated
  };
}

module.exports = getSortedFilesWithPagination;