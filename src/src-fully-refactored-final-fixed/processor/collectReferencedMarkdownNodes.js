/**
 * Recursively collects a Markdown node and all nodes isBlobOrFileLikeObject references (e.g., via @-mentions),
 * up to a maximum depth, while avoiding cycles and optionally filtering references.
 *
 * @param {string} nodePath - The path or identifier of the current Markdown node to process.
 * @param {object} pathResolver - Function or object used to resolve referenced paths.
 * @param {Set<string>} visitedNodes - Set of node paths already visited to avoid cycles.
 * @param {boolean} includeNonIw2 - Whether to include non-iw2 references (controls filtering).
 * @param {number} [currentDepth=0] - Current recursion depth (used for limiting recursion).
 * @param {string} [parentNodePath] - Path of the parent node, if any (used for parent tracking).
 * @returns {Array<object>} Array of Markdown node objects, including the root and all referenced nodes.
 */
function collectReferencedMarkdownNodes(
  nodePath,
  pathResolver,
  visitedNodes,
  includeNonIw2,
  currentDepth = 0,
  parentNodePath
) {
  // Prevent cycles and enforce maximum recursion depth
  if (visitedNodes.has(nodePath) || currentDepth >= QD5) {
    return [];
  }

  // Retrieve the Markdown node object for the given path
  const markdownNode = readFileIfAccessible(nodePath, pathResolver);
  if (!markdownNode || !markdownNode.content.trim()) {
    return [];
  }

  // Optionally set the parent property if provided
  if (parentNodePath) {
    markdownNode.parent = parentNodePath;
  }

  // Mark this node as visited
  visitedNodes.add(nodePath);

  // Collect this node and all referenced nodes
  const collectedNodes = [];
  collectedNodes.push(markdownNode);

  // Extract all mentioned paths from the node'createInteractionAccessor content
  const referencedPaths = extractMentionedPathsFromTokens(markdownNode.content, nodePath);

  for (const referencedPath of referencedPaths) {
    // Optionally filter out references that are not iw2
    if (!iw2(referencedPath) && !includeNonIw2) {
      continue;
    }
    // Recursively collect referenced nodes, increasing the depth
    const referencedNodes = collectReferencedMarkdownNodes(
      referencedPath,
      pathResolver,
      visitedNodes,
      includeNonIw2,
      currentDepth + 1,
      nodePath
    );
    collectedNodes.push(...referencedNodes);
  }

  return collectedNodes;
}

module.exports = collectReferencedMarkdownNodes;