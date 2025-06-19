/**
 * Recursively processes project content by traversing parent paths from a given source observable,
 * collecting all referenced 'CLAUDE.md' files along the way, and aggregating their mentioned content.
 *
 * @param {string} sourceObservable - The starting point for traversal, typically a file or directory path.
 * @param {object} config - Configuration object used for validation and processing.
 * @returns {Array} An array of content objects collected from referenced 'CLAUDE.md' files.
 */
function processProjectContentRecursively(sourceObservable, config) {
  const collectedContent = [];

  // Validate the source and config; if invalid, return empty result
  if (!nJ(sourceObservable, config)) return collectedContent;

  const visitedPaths = new Set();
  const projectRoot = C4();
  let currentPath = Xt1(eZ5(sourceObservable));
  const parentPaths = [];

  // Traverse up the directory tree until reaching the project root or the root of the current path
  while (currentPath !== projectRoot && currentPath !== lw2(currentPath).root) {
    // Only consider paths that are descendants of the project root
    if (currentPath.startsWith(projectRoot)) {
      parentPaths.push(currentPath);
    }
    currentPath = Xt1(currentPath);
  }

  // For each parent path (from closest to farthest), collect referenced content
  for (const parentPath of parentPaths.reverse()) {
    const claudeFilePath = Jt1(parentPath, "CLAUDE.md");
    // Recursively collect mentioned content from the CLAUDE.md file
    const mentionedContent = collectMentionedContentRecursively(
      claudeFilePath,
      "Project",
      visitedPaths,
      false
    );
    collectedContent.push(...mentionedContent);
  }

  return collectedContent;
}

module.exports = processProjectContentRecursively;