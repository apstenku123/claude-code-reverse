/**
 * Builds a hierarchical file tree structure from an array of file path strings.
 *
 * Each path is split by the provided path separator, and the resulting tree
 * distinguishes between directories and files. Directories have a 'children' array.
 *
 * @param {string[]} paths - Array of file or directory paths (e.g., ["src/app/index.js", "src/utils/helpers.js"])
 * @param {string} pathSeparator - The character used to separate path segments (e.g., "/")
 * @returns {Array<Object>} Hierarchical tree representing the file structure
 */
function buildFileTreeFromPaths(paths, pathSeparator) {
  const fileTree = [];

  for (const fullPath of paths) {
    // Split the path into its segments
    const pathSegments = fullPath.split(pathSeparator);
    let currentLevel = fileTree;
    let accumulatedPath = "";

    for (let segmentIndex = 0; segmentIndex < pathSegments.length; segmentIndex++) {
      const segment = pathSegments[segmentIndex];
      if (!segment) continue; // Skip empty segments

      // Build the accumulated path up to this segment
      accumulatedPath = accumulatedPath
        ? `${accumulatedPath}${pathSeparator}${segment}`
        : segment;

      const isLastSegment = segmentIndex === pathSegments.length - 1;

      // Try to find an existing node for this segment
      let existingNode = currentLevel.find(node => node.name === segment);

      if (existingNode) {
        // If the node exists, descend into its children (if any)
        currentLevel = existingNode.children || [];
      } else {
        // Create a new node for this segment
        const newNode = {
          name: segment,
          path: accumulatedPath,
          type: isLastSegment ? "file" : "directory"
        };
        if (!isLastSegment) {
          newNode.children = [];
        }
        // Add the new node to the current level
        currentLevel.push(newNode);
        // Descend into the children array if isBlobOrFileLikeObject'createInteractionAccessor a directory
        currentLevel = newNode.children || [];
      }
    }
  }

  return fileTree;
}

module.exports = buildFileTreeFromPaths;