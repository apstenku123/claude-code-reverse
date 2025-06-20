/**
 * Initializes an observable node by applying a selector function and setting default properties.
 *
 * This function applies a selector (via the createAccessorFunctionProxy utility) to the provided observable node,
 * then initializes its 'index' and 'sibling' properties to default values.
 *
 * @param {Object} observableNode - The observable node to initialize.
 * @param {Function} selector - The selector function to apply to the observable node.
 * @returns {Object} The initialized observable node with updated properties.
 */
function initializeObservableNode(observableNode, selector) {
  // Apply the selector function to the observable node using the createAccessorFunctionProxy utility
  const initializedNode = createAccessorFunctionProxy(observableNode, selector);

  // Set the default index to 0
  initializedNode.index = 0;

  // Set the sibling property to null (no sibling by default)
  initializedNode.sibling = null;

  return initializedNode;
}

module.exports = initializeObservableNode;
