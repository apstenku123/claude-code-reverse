/**
 * Checks if the nodeName property of a given DOM node exists within a provided list of node names.
 *
 * @param {Object} domNode - The DOM node object containing a nodeName property.
 * @param {Array<string>} nodeNameList - An array of node name strings to check against.
 * @returns {boolean} True if the domNode'createInteractionAccessor nodeName exists in nodeNameList, otherwise false.
 */
function isNodeNameInList(domNode, nodeNameList) {
  // Check if the nodeName of the given DOM node is present in the nodeNameList array
  return nodeNameList.indexOf(domNode.nodeName) >= 0;
}

module.exports = isNodeNameInList;