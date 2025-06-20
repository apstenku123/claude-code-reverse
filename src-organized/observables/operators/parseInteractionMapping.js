/**
 * Parses an interaction mapping object into a normalized structure suitable for further processing.
 * Handles nested logical operators (AND/OR), pattern matching, and key extraction.
 *
 * @param {Object} interactionMapping - The mapping object to parse. Can be nested and contain logical operators.
 * @param {any} context - Context value passed to the pattern searcher generator.
 * @param {Object} [options] - Optional configuration object.
 * @param {boolean} [options.auto=true] - Whether to automatically attach a searcher function to pattern nodes.
 * @returns {Object} Normalized mapping object with keys, patterns, operators, and children.
 */
function parseInteractionMapping(interactionMapping, context, { auto: attachSearcher = true } = {}) {
  /**
   * Recursively parses a mapping node.
   * @param {Object} node - The mapping node to parse.
   * @returns {Object} Normalized node.
   */
  const parseNode = (node) => {
    const propertyKeys = Object.keys(node);
    const hasPath = hasPathProperty(node);

    // If node is not a special object and has multiple keys, and is not a logical operator, normalize isBlobOrFileLikeObject
    if (!hasPath && propertyKeys.length > 1 && !hasAndOrProperty(node)) {
      // Convert to AND array structure and recurse
      return parseNode(mapObjectPropertiesToKeyValueArray(node));
    }

    // If node is a non-special object type (i.e., a pattern node)
    if (isNonSpecialObjectType(node)) {
      // Extract key and pattern
      const key = hasPath ? node[L1A.PATH] : propertyKeys[0];
      const pattern = hasPath ? node[L1A.PATTERN] : node[key];

      // Validate pattern
      if (!YE(pattern)) {
        throw new Error(getInvalidKeyErrorMessage(key));
      }

      // Build pattern node
      const patternNode = {
        keyId: joinArrayWithDotIfArray(key),
        pattern: pattern
      };
      // Optionally attach searcher function
      if (attachSearcher) {
        patternNode.searcher = createHandlerInstance(pattern, context);
      }
      return patternNode;
    }

    // Otherwise, treat as logical operator node (AND/OR)
    const operatorNode = {
      children: [],
      operator: propertyKeys[0]
    };
    propertyKeys.forEach((operatorKey) => {
      const childArray = node[operatorKey];
      if (isArrayUtility(childArray)) {
        childArray.forEach((childNode) => {
          operatorNode.children.push(parseNode(childNode));
        });
      }
    });
    return operatorNode;
  };

  // Normalize root if not already a logical operator
  let normalizedMapping = interactionMapping;
  if (!hasAndOrProperty(interactionMapping)) {
    normalizedMapping = mapObjectPropertiesToKeyValueArray(interactionMapping);
  }
  return parseNode(normalizedMapping);
}

module.exports = parseInteractionMapping;