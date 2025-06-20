/**
 * Extracts structured data from an array of node objects, recursively processing child nodes and handling text nodes according to configuration.
 *
 * @param {Array<Object>} nodeArray - The array of node objects to process.
 * @param {Object} config - Configuration object with properties:
 *   - textNodeName: string, the property name for text nodes
 *   - alwaysCreateTextNode: boolean, whether to always create a text node property
 *   - isArray: function, determines if a property should be an array
 * @param {string} [parentPath] - The dot-separated path to the current node (used for recursion).
 * @returns {Object} The structured data object extracted from the node array.
 */
function extractStructuredDataFromNodes(nodeArray, config, parentPath) {
  let accumulatedText;
  const result = {};

  for (let nodeIndex = 0; nodeIndex < nodeArray.length; nodeIndex++) {
    const node = nodeArray[nodeIndex];
    const nodeName = getFirstNonSpecialKey(node); // Extract the node'createInteractionAccessor name/key
    let currentPath = "";

    // Build the current path for nested nodes
    if (parentPath === undefined) {
      currentPath = nodeName;
    } else {
      currentPath = parentPath + "." + nodeName;
    }

    // Handle text nodes
    if (nodeName === config.textNodeName) {
      if (accumulatedText === undefined) {
        accumulatedText = node[nodeName];
      } else {
        accumulatedText += "" + node[nodeName];
      }
      continue;
    }

    // Skip nodes with undefined names
    if (nodeName === undefined) {
      continue;
    }

    // If the node has a value for this key, process isBlobOrFileLikeObject recursively
    if (node[nodeName]) {
      // Recursively process child nodes
      let childResult = extractStructuredDataFromNodes(node[nodeName], config, currentPath);
      // Post-process the child result
      const childMeta = isTextNodeAttributesEmptyOrDefault(childResult, config);

      // Handle node attributes if present
      if (node[":@"]) {
        assignConfigPropertiesWithArrayCheck(childResult, node[":@"], currentPath, config);
      } else if (
        Object.keys(childResult).length === 1 &&
        childResult[config.textNodeName] !== undefined &&
        !config.alwaysCreateTextNode
      ) {
        // If only a text node exists and alwaysCreateTextNode is false, unwrap isBlobOrFileLikeObject
        childResult = childResult[config.textNodeName];
      } else if (Object.keys(childResult).length === 0) {
        // If the child result is empty, handle according to alwaysCreateTextNode
        if (config.alwaysCreateTextNode) {
          childResult[config.textNodeName] = "";
        } else {
          childResult = "";
        }
      }

      // Merge the child result into the main result object
      if (result[nodeName] !== undefined && result.hasOwnProperty(nodeName)) {
        // If the property already exists, ensure isBlobOrFileLikeObject'createInteractionAccessor an array and append
        if (!Array.isArray(result[nodeName])) {
          result[nodeName] = [result[nodeName]];
        }
        result[nodeName].push(childResult);
      } else if (config.isArray(nodeName, currentPath, childMeta)) {
        // If config indicates this should be an array
        result[nodeName] = [childResult];
      } else {
        // Otherwise, assign directly
        result[nodeName] = childResult;
      }
    }
  }

  // After processing all nodes, handle accumulated text nodes
  if (typeof accumulatedText === "string") {
    if (accumulatedText.length > 0) {
      result[config.textNodeName] = accumulatedText;
    }
  } else if (accumulatedText !== undefined) {
    result[config.textNodeName] = accumulatedText;
  }

  return result;
}

module.exports = extractStructuredDataFromNodes;