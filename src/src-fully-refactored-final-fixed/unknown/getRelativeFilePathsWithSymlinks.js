/**
 * Retrieves a list of relative file paths from the current working directory, including symlinked files.
 * 
 * This function uses an AbortController to allow for cancellation of the file search operation.
 * It calls extractTrimmedLinesFromObservable to get all files (including following symlinks), then converts each absolute path to a relative path
 * using LW.relative and the current working directory (from C4). It then combines the result of zw5 (which likely
 * processes symlinks or related files) with the original list of relative file paths.
 *
 * @async
 * @returns {Promise<string[]>} An array of relative file paths, including any additional paths from zw5.
 */
async function getRelativeFilePathsWithSymlinks() {
  // Create an AbortController to allow cancellation of the file search
  const abortController = new AbortController();

  // Retrieve all files (including following symlinks) in the current directory
  // extractTrimmedLinesFromObservable returns an array of absolute file paths
  const absoluteFilePaths = await extractTrimmedLinesFromObservable(["--files", "--follow"], ".", abortController.signal);

  // Convert each absolute file path to a relative path from the current working directory
  const relativeFilePaths = absoluteFilePaths.map(absolutePath => LW.relative(C4(), absolutePath));

  // zw5 likely returns additional related file paths (e.g., symlinks or metadata)
  // Combine those with the original list
  return [
    ...zw5(relativeFilePaths),
    ...relativeFilePaths
  ];
}

module.exports = getRelativeFilePathsWithSymlinks;