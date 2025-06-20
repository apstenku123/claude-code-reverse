/**
 * Collects all project clauses from a given source observable and configuration.
 *
 * This function traverses the observable'createInteractionAccessor ancestry, collecting all nodes that start with the project root,
 * and then gathers their associated 'CLAUDE.md' clauses using the provided dependencies.
 *
 * @param {string} sourceObservable - The source observable identifier to process.
 * @param {string} config - The configuration or context for validation.
 * @returns {string[]} An array of collected project clause strings.
 */
function collectProjectClauses(sourceObservable, config) {
  const collectedClauses = [];

  // Validate the observable and config before proceeding
  if (!nJ(sourceObservable, config)) return collectedClauses;

  const processedSet = new Set();
  const projectRoot = C4();
  const initialNode = Xt1(eZ5(sourceObservable));
  const matchingNodes = [];
  let currentNode = initialNode;

  // Traverse up the observable'createInteractionAccessor ancestry until reaching the project root or the root of the current node
  while (currentNode !== projectRoot && currentNode !== lw2(currentNode).root) {
    // Collect nodes that start with the project root
    if (currentNode.startsWith(projectRoot)) {
      matchingNodes.push(currentNode);
    }
    currentNode = Xt1(currentNode);
  }

  // For each matching node (from deepest to shallowest), collect its 'CLAUDE.md' clauses
  for (const node of matchingNodes.reverse()) {
    const clausePath = Jt1(node, "CLAUDE.md");
    collectedClauses.push(...collectMentionedContentRecursively(clausePath, "Project", processedSet, false));
  }

  return collectedClauses;
}

module.exports = collectProjectClauses;