/**
 * Retrieves a list of relative file paths from the current working directory, including additional entries from zw5().
 *
 * This function uses an AbortController to manage the async operation of fetching files (via extractTrimmedLinesFromObservable),
 * then maps each file path to a relative path (using LW.relative and C4), and finally combines the result
 * with additional entries from zw5().
 *
 * @async
 * @returns {Promise<string[]>} An array containing additional entries from zw5() followed by the relative file paths.
 */
async function getRelativeFilePathsWithExtras() {
  // Create an AbortController to allow cancellation of the file-fetching operation
  const abortController = new AbortController();

  // Fetch file paths with extractTrimmedLinesFromObservable, passing command-line flags, current directory, and abort signal
  const absoluteFilePaths = await extractTrimmedLinesFromObservable(["--files", "--follow"], ".", abortController.signal);

  // Map each absolute file path to a relative path from the current working directory
  const relativeFilePaths = absoluteFilePaths.map(filePath => LW.relative(C4(), filePath));

  // zw5 returns additional entries to be prepended to the result
  return [
    ...zw5(relativeFilePaths),
    ...relativeFilePaths
  ];
}

module.exports = getRelativeFilePathsWithExtras;