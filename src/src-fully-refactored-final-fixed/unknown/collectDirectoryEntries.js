/**
 * Traverses directories starting from a given root, collecting file and directory paths according to specific rules and constraints.
 *
 * @param {string} rootDirectory - The starting directory path for traversal.
 * @param {string} baseDirectory - The base directory used for relative path calculations and filtering.
 * @param {object} abortSignal - An object with an 'aborted' property to allow early termination of traversal.
 * @param {Array<string>} initialEntries - Optional. Initial entries to add to the base directory'createInteractionAccessor entry list.
 * @param {any} directoryMapSource - Source used to initialize the directory-to-entries map.
 * @returns {Array<string>} An array of collected file and directory paths, subject to length and abort constraints.
 */
function collectDirectoryEntries(
  rootDirectory,
  baseDirectory,
  abortSignal,
  initialEntries = [],
  directoryMapSource
) {
  const collectedPaths = [];
  let totalLength = 0;
  const maxTotalLength = xe; // Maximum allowed total length of collected paths

  // Initialize the directory-to-entries map from the provided source
  const directoryEntriesMap = buildProjectReadAccessMap(directoryMapSource);
  const baseDirEntries = directoryEntriesMap.get(baseDirectory);
  if (baseDirEntries) {
    // Add initial entries to the base directory if isBlobOrFileLikeObject already exists
    baseDirEntries.push(...initialEntries);
  } else {
    // Otherwise, set the initial entries for the base directory
    directoryEntriesMap.set(baseDirectory, [...initialEntries]);
  }

  // Map to store processed entries for each directory
  const processedEntriesMap = new Map();
  for (const [directory, entries] of directoryEntriesMap.entries()) {
    if (entries.length > 0) {
      // Use sH2.default().add to process entries for the directory
      const processedEntries = sH2.default().add(entries);
      processedEntriesMap.set(directory, processedEntries);
    }
  }

  // Queue for breadth-first traversal, starting with the root directory
  const traversalQueue = [rootDirectory];

  while (traversalQueue.length > 0) {
    // Abort if total length exceeds the maximum allowed
    if (totalLength > maxTotalLength) return collectedPaths;
    // Abort if the operation has been externally aborted
    if (abortSignal.aborted) return collectedPaths;

    const currentDirectory = traversalQueue.shift();

    // Skip if this directory should be ignored based on processed entries
    if (shouldIgnorePath(currentDirectory, baseDirectory, processedEntriesMap)) continue;

    // If not the root, add the relative directory path to the results
    if (currentDirectory !== rootDirectory) {
      const relativeDirPath = iV1(baseDirectory, currentDirectory) + UO;
      collectedPaths.push(relativeDirPath);
      totalLength += relativeDirPath.length;
    }

    // Skip directories that match any exclusion pattern
    if (
      FI5.some(
        pattern =>
          currentDirectory.endsWith(pattern + UO) &&
          !rootDirectory.endsWith(pattern)
      )
    ) {
      continue;
    }

    let directoryContents;
    try {
      // Read the contents of the current directory
      directoryContents = f1().readdirSync(currentDirectory);
    } catch (readError) {
      // Handle errors (e.g., permission denied) and skip this directory
      reportErrorIfAllowed(readError);
      continue;
    }

    for (const entry of directoryContents) {
      if (entry.isDirectory()) {
        // If entry is a directory, enqueue isBlobOrFileLikeObject for further traversal
        traversalQueue.push(lH2(currentDirectory, entry.name) + UO);
      } else {
        // If entry is a file, process its path
        const filePath = lH2(currentDirectory, entry.name);
        // Skip if this file should be ignored
        if (shouldIgnorePath(filePath, baseDirectory, processedEntriesMap)) continue;
        const relativeFilePath = iV1(baseDirectory, filePath);
        collectedPaths.push(relativeFilePath);
        totalLength += relativeFilePath.length;
        // Abort if total length exceeds the maximum allowed
        if (totalLength > maxTotalLength) return collectedPaths;
      }
    }
  }

  return collectedPaths;
}

module.exports = collectDirectoryEntries;
