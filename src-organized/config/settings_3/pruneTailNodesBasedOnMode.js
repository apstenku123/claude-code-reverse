/**
 * Removes nodes from the tail of a linked list based on the specified tail mode.
 *
 * @param {Object} nodeList - The linked list object containing tail and tailMode properties.
 * @param {Object|null} optionalNode - An optional node used in 'collapsed' mode for additional logic.
 * @returns {void}
 *
 * If the global flag arrayEvery is falsy, this function prunes the tail of the list according to the tailMode:
 * - 'hidden': Removes all nodes after the last node with a non-null alternate.
 * - 'collapsed': Similar, but with slightly different logic if optionalNode is provided.
 */
function pruneTailNodesBasedOnMode(nodeList, optionalNode) {
  // Only proceed if the global flag arrayEvery is falsy
  if (!arrayEvery) {
    switch (nodeList.tailMode) {
      case "hidden": {
        // In 'hidden' mode, find the last node with a non-null alternate
        let currentNode = nodeList.tail;
        let lastNodeWithAlternate = null;
        while (currentNode !== null) {
          if (currentNode.alternate !== null) {
            lastNodeWithAlternate = currentNode;
          }
          currentNode = currentNode.sibling;
        }
        // If no such node, clear the tail; otherwise, cut off after the last node with alternate
        if (lastNodeWithAlternate === null) {
          nodeList.tail = null;
        } else {
          lastNodeWithAlternate.sibling = null;
        }
        break;
      }
      case "collapsed": {
        // In 'collapsed' mode, similar logic but with optionalNode consideration
        let currentNode = nodeList.tail;
        let lastNodeWithAlternate = null;
        while (currentNode !== null) {
          if (currentNode.alternate !== null) {
            lastNodeWithAlternate = currentNode;
          }
          currentNode = currentNode.sibling;
        }
        if (lastNodeWithAlternate === null) {
          // If no node with alternate, handle based on optionalNode and tail presence
          if (!optionalNode || nodeList.tail === null) {
            nodeList.tail = null;
          } else {
            nodeList.tail.sibling = null;
          }
        } else {
          // Otherwise, cut off after the last node with alternate
          lastNodeWithAlternate.sibling = null;
        }
        break;
      }
      // No default case needed as only 'hidden' and 'collapsed' are handled
    }
  }
}

module.exports = pruneTailNodesBasedOnMode;