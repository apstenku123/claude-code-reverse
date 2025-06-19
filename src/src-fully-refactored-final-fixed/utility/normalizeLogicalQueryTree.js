/**
 * Normalizes a logical query object tree into a consistent, structured format.
 * Handles logical operators (AND/OR), patterns, and path-based queries, recursively processing nested structures.
 *
 * @param {Object} queryObject - The logical query object to normalize.
 * @param {Object} context - Context object passed to pattern searchers.
 * @param {Object} [options] - Optional settings.
 * @param {boolean} [options.auto=true] - Whether to automatically add a searcher property to pattern nodes.
 * @returns {Object} The normalized logical query tree.
 */
function normalizeLogicalQueryTree(queryObject, context, { auto: autoAddSearcher = true } = {}) {
  /**
   * Recursively normalizes a logical query node.
   * @param {Object} node - The current node to normalize.
   * @returns {Object} The normalized node.
   */
  const normalizeNode = (node) => {
    const nodeKeys = Object.keys(node);
    const hasPath = hasPathProperty(node);

    // If node is not a path node, has multiple keys, and is not a logical operator, wrap in AND
    if (!hasPath && nodeKeys.length > 1 && !hasLogicalOperatorProperty(node)) {
      return normalizeNode(mapObjectPropertiesToAndKey(node));
    }

    // If node is a plain object-like (potentially a leaf or pattern node)
    if (aLike(node)) {
      // Determine path and pattern
      const pathKey = hasPath ? node[LogicalNodeKeys.PATH] : nodeKeys[0];
      const patternValue = hasPath ? node[LogicalNodeKeys.PATTERN] : node[pathKey];

      // Validate pattern
      if (!isValidPattern(patternValue)) {
        throw new Error(getInvalidKeyErrorMessage(pathKey));
      }

      // Build pattern node
      const patternNode = {
        keyId: getKeyId(pathKey),
        pattern: patternValue
      };
      // Optionally add searcher
      if (autoAddSearcher) {
        patternNode.searcher = createPatternSearcher(patternValue, context);
      }
      return patternNode;
    }

    // Otherwise, treat as logical operator node
    const operatorNode = {
      children: [],
      operator: nodeKeys[0]
    };

    nodeKeys.forEach(operatorKey => {
      const childNodes = node[operatorKey];
      // If the value is an array, process each child recursively
      if (isArrayUtility(childNodes)) {
        childNodes.forEach(childNode => {
          operatorNode.children.push(normalizeNode(childNode));
        });
      }
    });
    return operatorNode;
  };

  // If the root is not a logical operator, wrap isBlobOrFileLikeObject in AND
  let normalizedRoot = queryObject;
  if (!hasLogicalOperatorProperty(queryObject)) {
    normalizedRoot = mapObjectPropertiesToAndKey(queryObject);
  }
  return normalizeNode(normalizedRoot);
}

module.exports = normalizeLogicalQueryTree;