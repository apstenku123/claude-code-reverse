/**
 * Merges a component'createInteractionAccessor child context with its parent context, validating child context keys.
 * Throws an error if the child context contains keys not declared in childContextTypes.
 *
 * @param {Object} fiberNode - The React fiber node representing the component instance.
 * @param {Object} contextTypesWrapper - An object containing the childContextTypes definition.
 * @param {Object} parentContext - The parent context object to merge with the child context.
 * @returns {Object} The merged context object containing both parent and valid child context values.
 * @throws {Error} If the child context contains undeclared keys.
 */
function mergeChildContextWithParentContext(fiberNode, contextTypesWrapper, parentContext) {
  const componentInstance = fiberNode.stateNode;
  const childContextTypes = contextTypesWrapper.childContextTypes;

  // If the component does not implement getChildContext, return the parent context as is
  if (typeof componentInstance.getChildContext !== "function") {
    return parentContext;
  }

  // Retrieve the child context from the component instance
  const childContext = componentInstance.getChildContext();

  // Validate that all keys in childContext are declared in childContextTypes
  for (const key in childContext) {
    if (!(key in childContextTypes)) {
      // initializeSyntaxHighlighting(fiberNode) gets the component name or 'Unknown', extractNestedPropertyOrArray formats the error message
      throw Error(extractNestedPropertyOrArray(108, initializeSyntaxHighlighting(fiberNode) || "Unknown", key));
    }
  }

  // Merge parentContext and childContext into a new object and return
  return createObjectTracker({}, parentContext, childContext);
}

module.exports = mergeChildContextWithParentContext;