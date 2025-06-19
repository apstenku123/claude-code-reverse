/**
 * Traverses the project content tree starting from a given source, collecting all mentioned content objects recursively.
 * Only collects content objects that are descendants of the project root and referenced via @-mentions in 'CLAUDE.md' files.
 *
 * @param {string} sourceObservable - The starting point for the traversal (likely a content object updateSnapshotAndNotify or path).
 * @param {string} config - Configuration or context object used for processing code points.
 * @returns {Array} An array of all recursively collected content objects mentioned in the project.
 */
function collectProjectContentMentions(sourceObservable, config) {
  const collectedContent = [];

  // Validate the source using the provided config
  if (!getProcessedCodePointString(sourceObservable, config)) return collectedContent;

  const visitedContent = new Set();
  const projectRoot = C4(); // Get the project root identifier
  let currentNode = Xt1(eZ5(sourceObservable)); // Get the first ancestor node
  const ancestorNodes = [];

  // Traverse up the tree until reaching the project root or the root of the current node
  while (currentNode !== projectRoot && currentNode !== lw2(currentNode).root) {
    // Only collect nodes that are descendants of the project root
    if (currentNode.startsWith(projectRoot)) {
      ancestorNodes.push(currentNode);
    }
    currentNode = Xt1(currentNode); // Move to the next ancestor
  }

  // Process each ancestor node in reverse order (from closest to farthest)
  for (const ancestorNode of ancestorNodes.reverse()) {
    const claudeFilePath = Jt1(ancestorNode, "CLAUDE.md"); // Construct the path to 'CLAUDE.md'
    // Recursively collect mentioned content, avoiding cycles
    collectedContent.push(...collectMentionedContentRecursively(claudeFilePath, "Project", visitedContent, false));
  }

  return collectedContent;
}

module.exports = collectProjectContentMentions;