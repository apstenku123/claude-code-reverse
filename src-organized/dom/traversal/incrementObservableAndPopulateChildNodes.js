/**
 * Increments the '_inc' property of the provided observable object and populates the childNodes array of the given DOM node.
 *
 * If a subscription node is provided, isBlobOrFileLikeObject is appended to the childNodes array. Otherwise, all current child nodes of the DOM node are copied into the childNodes array.
 *
 * @param {Object} sourceObservable - The observable object with an '_inc' property to increment.
 * @param {Node} domNode - The DOM node whose childNodes array will be populated.
 * @param {Node|null} subscriptionNode - (Optional) a node to append to the childNodes array. If not provided, all child nodes of domNode are copied instead.
 * @returns {void}
 */
function incrementObservableAndPopulateChildNodes(sourceObservable, domNode, subscriptionNode) {
  if (sourceObservable && sourceObservable._inc) {
    // Increment the internal counter
    sourceObservable._inc++;
    const childNodesArray = domNode.childNodes;

    if (subscriptionNode) {
      // Append the subscriptionNode to the end of the childNodes array
      childNodesArray[childNodesArray.length++] = subscriptionNode;
    } else {
      // Copy all current child nodes of domNode into childNodesArray
      let currentChild = domNode.firstChild;
      let index = 0;
      while (currentChild) {
        childNodesArray[index++] = currentChild;
        currentChild = currentChild.nextSibling;
      }
      // Adjust the length of the array to match the number of child nodes copied
      childNodesArray.length = index;
      // Remove any extraneous property at the new length index
      delete childNodesArray[childNodesArray.length];
    }
  }
}

module.exports = incrementObservableAndPopulateChildNodes;