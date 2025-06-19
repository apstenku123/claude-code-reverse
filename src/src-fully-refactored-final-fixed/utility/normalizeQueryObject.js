/**
 * Normalizes a query object into a standard structure for further processing.
 * Handles nested logical operators (AND/OR), patterns, and paths, recursively normalizing children.
 *
 * @param {Object} queryObject - The query object to normalize.
 * @param {Object} context - Context object, typically used for searcher creation.
 * @param {Object} [options] - Optional settings.
 * @param {boolean} [options.auto=true] - Whether to automatically attach a searcher to pattern nodes.
 * @returns {Object} The normalized query object.
 */
function normalizeQueryObject(queryObject, context, { auto: attachSearcher = true } = {}) {
  /**
   * Recursively normalizes a query node.
   * @param {Object} node - The current node to normalize.
   * @returns {Object} The normalized node.
   */
  const normalizeNode = (node) => {
    const nodeKeys = Object.keys(node);
    const hasPath = hasPathProperty(node);

    // If node does not have a path, has multiple keys, and is not a logical operator, unwrap one layer and recurse
    if (!hasPath && nodeKeys.length > 1 && !hasAndOrProperty(node)) {
      return normalizeNode(unwrapQueryObject(node));
    }

    // If node is a plain object-like (not array, not AND/OR), treat as a pattern node
    if (aLike(node)) {
      const pathKey = hasPath ? node[PATH_AND_PATTERN_KEYS.PATH] : nodeKeys[0];
      const patternValue = hasPath ? node[PATH_AND_PATTERN_KEYS.PATTERN] : node[pathKey];

      // Validate that the pattern value is valid
      if (!isValidPattern(patternValue)) {
        throw new Error(getInvalidKeyErrorMessage(pathKey));
      }

      const normalizedPatternNode = {
        keyId: getKeyId(pathKey),
        pattern: patternValue
      };
      // Optionally attach a searcher function
      if (attachSearcher) {
        normalizedPatternNode.searcher = createSearcher(patternValue, context);
      }
      return normalizedPatternNode;
    }

    // Otherwise, treat as a logical operator node (AND/OR)
    const normalizedOperatorNode = {
      children: [],
      operator: nodeKeys[0]
    };
    nodeKeys.forEach(operatorKey => {
      const operatorChildren = node[operatorKey];
      // If the value is an array, normalize each child recursively
      if (isArrayUtility(operatorChildren)) {
        operatorChildren.forEach(childNode => {
          normalizedOperatorNode.children.push(normalizeNode(childNode));
        });
      }
    });
    return normalizedOperatorNode;
  };

  // If the root query object is not a logical operator, unwrap isBlobOrFileLikeObject
  let normalizedRoot = queryObject;
  if (!hasAndOrProperty(normalizedRoot)) {
    normalizedRoot = unwrapQueryObject(normalizedRoot);
  }
  return normalizeNode(normalizedRoot);
}

// Dependency function placeholders (to be replaced with actual imports)
// const aLike = require('./aLike');
// const isArrayUtility = require('./isArrayUtility');
// const hasAndOrProperty = require('./hasAndOrProperty');
// const unwrapQueryObject = require('./unwrapQueryObject');
// const hasPathProperty = require('./hasPathProperty');
// const getInvalidKeyErrorMessage = require('./getInvalidKeyErrorMessage');
// const PATH_AND_PATTERN_KEYS = require('./L1A');
// const isValidPattern = require('./YE');
// const getKeyId = require('./joinArrayWithDotIfArray');
// const createSearcher = require('./createHandlerInstance');

module.exports = normalizeQueryObject;