/**
 * Transforms an array of node objects into a structured object based on configuration rules.
 * Handles text nodes, nested nodes, and array structures, recursively processing children.
 *
 * @param {Array<Object>} nodeArray - The array of node objects to transform.
 * @param {Object} config - Configuration object with rules for processing nodes.
 * @param {string} [parentPath] - Optional parent path for nested node naming.
 * @returns {Object} The transformed object representing the node structure.
 */
function transformNodeArrayToObject(nodeArray, config, parentPath) {
  let accumulatedTextContent;
  const resultObject = {};

  for (let nodeIndex = 0; nodeIndex < nodeArray.length; nodeIndex++) {
    const node = nodeArray[nodeIndex];
    const nodeName = getFirstNonSpecialKey(node); // Extract node name/key
    let currentPath = "";

    // Determine the current path for nested nodes
    if (parentPath === undefined) {
      currentPath = nodeName;
    } else {
      currentPath = parentPath + "." + nodeName;
    }

    // If this node is a text node
    if (nodeName === config.textNodeName) {
      if (accumulatedTextContent === undefined) {
        accumulatedTextContent = node[nodeName];
      } else {
        accumulatedTextContent += "" + node[nodeName];
      }
    } else if (nodeName === undefined) {
      // Skip nodes with undefined names
      continue;
    } else if (node[nodeName]) {
      // Recursively process child nodes
      let childObject = transformNodeArrayToObject(node[nodeName], config, currentPath);
      const childMeta = isTextNodeAttributesEmptyOrDefault(childObject, config);

      // Handle node attributes if present
      if (node[":@"]) {
        assignConfigPropertiesWithArrayCheck(childObject, node[":@"], currentPath, config);
      } else if (
        Object.keys(childObject).length === 1 &&
        childObject[config.textNodeName] !== undefined &&
        !config.alwaysCreateTextNode
      ) {
        // If only text node present and not forced to create text node, unwrap
        childObject = childObject[config.textNodeName];
      } else if (Object.keys(childObject).length === 0) {
        // If no children, handle empty node
        if (config.alwaysCreateTextNode) {
          childObject[config.textNodeName] = "";
        } else {
          childObject = "";
        }
      }

      // Merge child into result, handling arrays if necessary
      if (resultObject[nodeName] !== undefined && resultObject.hasOwnProperty(nodeName)) {
        if (!Array.isArray(resultObject[nodeName])) {
          resultObject[nodeName] = [resultObject[nodeName]];
        }
        resultObject[nodeName].push(childObject);
      } else if (config.isArray(nodeName, currentPath, childMeta)) {
        resultObject[nodeName] = [childObject];
      } else {
        resultObject[nodeName] = childObject;
      }
    }
  }

  // Attach accumulated text content if present
  if (typeof accumulatedTextContent === "string") {
    if (accumulatedTextContent.length > 0) {
      resultObject[config.textNodeName] = accumulatedTextContent;
    }
  } else if (accumulatedTextContent !== undefined) {
    resultObject[config.textNodeName] = accumulatedTextContent;
  }

  return resultObject;
}

module.exports = transformNodeArrayToObject;