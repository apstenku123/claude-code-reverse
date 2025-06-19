/**
 * Traverses all child siblings of a given node and applies a callback function to each.
 *
 * @param {object} context - The context or state to pass to the callback function.
 * @param {object} callbackArg - An additional argument to pass to the callback function.
 * @param {object} parentNode - The parent node whose child siblings will be traversed.
 * @returns {void}
 */
function traverseChildSiblings(context, callbackArg, parentNode) {
  // Start with the first child of the parent node
  let currentChild = parentNode.child;
  // Iterate through all siblings of the child node
  while (currentChild !== null) {
    // Apply the callback function to the current child
    unmountFiberNode(context, callbackArg, currentChild);
    // Move to the next sibling
    currentChild = currentChild.sibling;
  }
}

module.exports = traverseChildSiblings;