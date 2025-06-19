/**
 * Collects all referenced Markdown nodes named 'CLAUDE.md' within the project, starting from a given root node.
 * Traverses the node hierarchy upwards from the starting node, collecting references to 'CLAUDE.md' files
 * in each ancestor directory that matches the project root prefix. Avoids cycles and duplicate references.
 *
 * @param {string} startNodeId - The identifier of the node to start traversal from.
 * @param {string} projectConfig - The project configuration or context used for validation.
 * @returns {string[]} An array of referenced Markdown node identifiers found in the project.
 */
function collectProjectMarkdownReferences(startNodeId, projectConfig) {
  const referencedMarkdownNodes = [];

  // Validate the start node and project config before proceeding
  if (!getProcessedCodePointString(startNodeId, projectConfig)) {
    return referencedMarkdownNodes;
  }

  // Set to keep track of already visited nodes to avoid cycles
  const visitedNodes = new Set();

  // Get the project root node identifier
  const projectRootId = C4();

  // Get the initial node'createInteractionAccessor root ancestor
  let currentNodeId = Xt1(eZ5(startNodeId));

  // Array to store ancestor node IDs that match the project root prefix
  const matchingAncestorNodeIds = [];

  // Traverse up the node hierarchy until reaching the project root or the root of the current node
  while (
    currentNodeId !== projectRootId &&
    currentNodeId !== lw2(currentNodeId).root
  ) {
    // If the current node is within the project root, add to the list
    if (currentNodeId.startsWith(projectRootId)) {
      matchingAncestorNodeIds.push(currentNodeId);
    }
    // Move up to the parent node
    currentNodeId = Xt1(currentNodeId);
  }

  // For each matching ancestor node (from closest to farthest), collect referenced Markdown nodes
  for (const ancestorNodeId of matchingAncestorNodeIds.reverse()) {
    // Construct the path to the 'CLAUDE.md' file in this ancestor directory
    const markdownNodePath = Jt1(ancestorNodeId, "CLAUDE.md");
    // Recursively collect referenced Markdown nodes, avoiding cycles
    referencedMarkdownNodes.push(
      ...collectReferencedMarkdownNodes(markdownNodePath, "Project", visitedNodes, false)
    );
  }

  return referencedMarkdownNodes;
}

module.exports = collectProjectMarkdownReferences;