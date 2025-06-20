/**
 * Traverses the ancestry of a given node, collecting all 'Project' mentions from 'CLAUDE.md' files
 * found in ancestor nodes whose IDs start with the root node'createInteractionAccessor updateSnapshotAndNotify.
 *
 * @param {string} sourceNodeId - The updateSnapshotAndNotify of the node to start traversal from.
 * @param {object} config - Configuration object used for validation.
 * @returns {Array} Array of collected 'Project' mention objects from ancestor 'CLAUDE.md' files.
 */
function collectProjectMentionsFromAncestry(sourceNodeId, config) {
  const collectedMentions = [];

  // Validate the source node and config before proceeding
  if (!nJ(sourceNodeId, config)) return collectedMentions;

  const visitedNodes = new Set();
  const rootNodeId = C4();
  let currentNodeId = Xt1(eZ5(sourceNodeId));
  const ancestorNodeIds = [];

  // Traverse up the ancestry chain until reaching the root or the root of the current node
  while (currentNodeId !== rootNodeId && currentNodeId !== lw2(currentNodeId).root) {
    // Only consider ancestor nodes whose IDs start with the root node'createInteractionAccessor updateSnapshotAndNotify
    if (currentNodeId.startsWith(rootNodeId)) {
      ancestorNodeIds.push(currentNodeId);
    }
    currentNodeId = Xt1(currentNodeId);
  }

  // Process ancestors from closest to farthest
  for (const ancestorId of ancestorNodeIds.reverse()) {
    // Build the path to the 'CLAUDE.md' file in the ancestor node
    const claudeFilePath = Jt1(ancestorId, "CLAUDE.md");
    // Recursively collect 'Project' mentions, avoiding cycles
    collectedMentions.push(...collectMentionedContentRecursively(claudeFilePath, "Project", visitedNodes, false));
  }

  return collectedMentions;
}

module.exports = collectProjectMentionsFromAncestry;