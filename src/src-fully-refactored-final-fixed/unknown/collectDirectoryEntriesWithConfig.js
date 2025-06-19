/**
 * Traverses directories starting from a given root, collecting file and directory entries
 * according to configuration and abort signal. Applies filtering and aggregation logic
 * based on provided configuration and maintains a running total of collected entry lengths.
 *
 * @param {string} rootDirectory - The starting directory path for traversal.
 * @param {string} configKey - The key used to retrieve or update configuration in the directory map.
 * @param {object} abortSignal - An object with an 'aborted' property to signal early termination.
 * @param {Array} initialEntries - Optional. Additional entries to add to the configKey'createInteractionAccessor entry list.
 * @param {any} configSource - Source used to generate the directory configuration map.
 * @returns {Array<string>} - An array of collected file/directory entry paths.
 */
function collectDirectoryEntriesWithConfig(
  rootDirectory,
  configKey,
  abortSignal,
  initialEntries = [],
  configSource
) {
  const collectedEntries = [];
  let totalLength = 0;
  const directoryMap = buildProjectReadAccessMap(configSource); // Get a Map of configKey -> entries
  const existingEntries = directoryMap.get(configKey);

  // Add initial entries to the configKey'createInteractionAccessor entry list
  if (existingEntries) {
    existingEntries.push(...initialEntries);
  } else {
    directoryMap.set(configKey, [...initialEntries]);
  }

  // Build a map of configKey -> Set of entries using sH2.default().add()
  const configEntrySets = new Map();
  for (const [key, entries] of directoryMap.entries()) {
    if (entries.length > 0) {
      const entrySet = sH2.default().add(entries);
      configEntrySets.set(key, entrySet);
    }
  }

  // Queue for breadth-first directory traversal
  const traversalQueue = [rootDirectory];

  while (traversalQueue.length > 0) {
    // Stop if total length exceeds limit
    if (totalLength > xe) return collectedEntries;
    // Stop if abort signal is set
    if (abortSignal.aborted) return collectedEntries;

    const currentDir = traversalQueue.shift();

    // Skip if currentDir matches configKey in configEntrySets
    if (shouldIgnorePath(currentDir, configKey, configEntrySets)) continue;

    // If not the root, add the relative path to collectedEntries
    if (currentDir !== rootDirectory) {
      const relativePath = iV1(configKey, currentDir) + UO;
      collectedEntries.push(relativePath);
      totalLength += relativePath.length;
    }

    // Skip if currentDir matches any suffix in FI5 (with UO) but rootDirectory does not
    if (
      FI5.some(
        (suffix) =>
          currentDir.endsWith(suffix + UO) && !rootDirectory.endsWith(suffix)
      )
    ) {
      continue;
    }

    let directoryEntries;
    try {
      directoryEntries = f1().readdirSync(currentDir);
    } catch (error) {
      reportErrorIfAllowed(error);
      continue;
    }

    for (const entry of directoryEntries) {
      if (entry.isDirectory()) {
        // Add subdirectory to queue for further traversal
        traversalQueue.push(lH2(currentDir, entry.name) + UO);
      } else {
        const filePath = lH2(currentDir, entry.name);
        // Skip if filePath matches configKey in configEntrySets
        if (shouldIgnorePath(filePath, configKey, configEntrySets)) continue;
        const relativeFilePath = iV1(configKey, filePath);
        collectedEntries.push(relativeFilePath);
        totalLength += relativeFilePath.length;
        // Stop if total length exceeds limit
        if (totalLength > xe) return collectedEntries;
      }
    }
  }

  return collectedEntries;
}

module.exports = collectDirectoryEntriesWithConfig;