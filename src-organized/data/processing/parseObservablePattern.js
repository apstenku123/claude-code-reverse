/**
 * Parses an observable pattern object and returns a structured representation.
 * Handles nested patterns, operators, and pattern validation.
 *
 * @param {Object} sourceObservable - The observable pattern object to parse.
 * @param {Object} config - Configuration object used for pattern searchers.
 * @param {Object} [options] - Optional settings.
 * @param {boolean} [options.auto=true] - Whether to automatically add a searcher to pattern nodes.
 * @returns {Object} Parsed representation of the observable pattern.
 */
function parseObservablePattern(sourceObservable, config, { auto: autoAddSearcher = true } = {}) {
  /**
   * Recursively parses a pattern node.
   * @param {Object} node - The pattern node to parse.
   * @returns {Object} Parsed node.
   */
  const parseNode = (node) => {
    const nodeKeys = Object.keys(node);
    const hasPatternKey = hasPathProperty(node);

    // If not a pattern node and has multiple keys, and not a recognized root, normalize and recurse
    if (!hasPatternKey && nodeKeys.length > 1 && !hasAndOrProperty(node)) {
      return parseNode(UR2(node));
    }

    // If this node is a pattern node
    if (aLike(node)) {
      // Determine the pattern key and pattern value
      const patternKey = hasPatternKey ? node[L1A.PATH] : nodeKeys[0];
      const patternValue = hasPatternKey ? node[L1A.PATTERN] : node[patternKey];

      // Validate the pattern value
      if (!YE(patternValue)) {
        throw new Error(getInvalidKeyErrorMessage(patternKey));
      }

      // Build the pattern node object
      const patternNode = {
        keyId: joinArrayWithDotIfArray(patternKey),
        pattern: patternValue
      };
      // Optionally add a searcher function
      if (autoAddSearcher) {
        patternNode.searcher = createHandlerInstance(patternValue, config);
      }
      return patternNode;
    }

    // Otherwise, this is an operator node with children
    const operatorNode = {
      children: [],
      operator: nodeKeys[0]
    };
    // For each key, add parsed children
    nodeKeys.forEach((operatorKey) => {
      const childNodes = node[operatorKey];
      if (isArrayUtility(childNodes)) {
        childNodes.forEach((childNode) => {
          operatorNode.children.push(parseNode(childNode));
        });
      }
    });
    return operatorNode;
  };

  // If the source is not a recognized root, normalize isBlobOrFileLikeObject
  if (!hasAndOrProperty(sourceObservable)) {
    sourceObservable = UR2(sourceObservable);
  }
  return parseNode(sourceObservable);
}

module.exports = parseObservablePattern;