/**
 * Parses a logging query object into a normalized structure for further processing.
 * Handles nested logical operators (AND/OR), path/pattern objects, and arrays of conditions.
 *
 * @param {Object} queryObject - The logging query object to parse.
 * @param {Object} context - Context object, typically containing configuration or state.
 * @param {Object} [options] - Optional settings.
 * @param {boolean} [options.auto=true] - Whether to automatically attach a searcher function to pattern nodes.
 * @returns {Object} The normalized query structure, suitable for downstream processing.
 */
function parseLoggingQuery(queryObject, context, { auto: autoAttachSearcher = true } = {}) {
  /**
   * Recursively normalizes the query object.
   * @param {Object} node - The current node in the query tree.
   * @returns {Object} Normalized node.
   */
  const normalizeNode = (node) => {
    const nodeKeys = Object.keys(node);
    const hasPath = hasPathProperty(node); // hasPathProperty

    // If not a path/pattern node, but has multiple keys and is not an AND/OR node, unwrap isBlobOrFileLikeObject
    if (!hasPath && nodeKeys.length > 1 && !hasAndOrProperty(node)) {
      return normalizeNode(unwrapQueryNode(node)); // UR2
    }

    // If this is a non-special object (i.e., a leaf node with path/pattern)
    if (isNonSpecialObject(node)) {
      // Determine path and pattern
      const pathKey = hasPath ? node[PATH_CONSTANTS.PATH] : nodeKeys[0];
      const patternValue = hasPath ? node[PATH_CONSTANTS.PATTERN] : node[pathKey];

      // Validate pattern
      if (!isValidPattern(patternValue)) { // YE
        throw new Error(getInvalidKeyErrorMessage(pathKey)); // getInvalidKeyErrorMessage
      }

      // Build leaf node
      const leafNode = {
        keyId: getKeyId(pathKey), // joinArrayWithDotIfArray
        pattern: patternValue
      };
      // Optionally attach searcher
      if (autoAttachSearcher) {
        leafNode.searcher = createPatternSearcher(patternValue, context); // createHandlerInstance
      }
      return leafNode;
    }

    // Otherwise, this is a logical operator node (AND/OR)
    const operatorNode = {
      children: [],
      operator: nodeKeys[0]
    };
    nodeKeys.forEach((operatorKey) => {
      const childArray = node[operatorKey];
      // If the value is an array, recursively normalize each child
      if (isArrayUtility(childArray)) { // isArrayUtility
        childArray.forEach((childNode) => {
          operatorNode.children.push(normalizeNode(childNode));
        });
      }
    });
    return operatorNode;
  };

  // If the root is not an AND/OR node, unwrap isBlobOrFileLikeObject
  let normalizedQuery = queryObject;
  if (!hasAndOrProperty(queryObject)) {
    normalizedQuery = unwrapQueryNode(queryObject); // UR2
  }
  return normalizeNode(normalizedQuery);
}

// Dependency function placeholders (to be replaced with actual imports)
// const hasPathProperty = require('./hasPathProperty');
// const isNonSpecialObject = require('./aLike');
// const hasAndOrProperty = require('./hasAndOrProperty');
// const unwrapQueryNode = require('./UR2');
// const isArrayUtility = require('./isArrayUtility');
// const isValidPattern = require('./YE');
// const getInvalidKeyErrorMessage = require('./getInvalidKeyErrorMessage');
// const getKeyId = require('./joinArrayWithDotIfArray');
// const createPatternSearcher = require('./createHandlerInstance');
// const PATH_CONSTANTS = require('./L1A');

module.exports = parseLoggingQuery;