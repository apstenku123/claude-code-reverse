/**
 * Retrieves a list of relative file paths from the current working directory, including extra entries from zw5().
 *
 * This function uses an AbortController to manage the async operation of fetching file paths.
 * It calls extractTrimmedLinesFromObservable() with specific CLI arguments to get a list of files, then maps each file to its relative path
 * using LW.relative() and the current working directory from C4(). It then combines the result with additional
 * entries from zw5().
 *
 * @async
 * @returns {Promise<string[]>} An array of relative file paths, including extra entries from zw5().
 */
async function getRelativeFilePathsWithExtraEntries() {
  // Create an AbortController to manage cancellation of the async operation
  const abortController = new AbortController();

  // Fetch the list of files with the given CLI arguments, using the abort signal
  const filePaths = await extractTrimmedLinesFromObservable(["--files", "--follow"], ".", abortController.signal);

  // Map each file path to its relative path from the current working directory
  const relativeFilePaths = filePaths.map(filePath => LW.relative(C4(), filePath));

  // Combine extra entries from zw5() with the relative file paths
  return [
    ...zw5(relativeFilePaths),
    ...relativeFilePaths
  ];
}

module.exports = getRelativeFilePathsWithExtraEntries;