/**
 * Determines if a given React fiber node has error handling lifecycle methods.
 * Specifically, checks if the component type defines getDerivedStateFromError,
 * or if the instance defines componentDidCatch, for error boundary support.
 *
 * @param {Object} fiberNode - The React fiber node to inspect.
 * @param {number|string} fiberNode.tag - The fiber node'createInteractionAccessor tag, indicating its type.
 * @param {Object} fiberNode.type - The component type (constructor or function).
 * @param {Object|null} fiberNode.stateNode - The component instance, if available.
 * @returns {boolean} True if the fiber node supports error handling lifecycle methods, false otherwise.
 */
function hasErrorHandlingLifecycle(fiberNode) {
  const { tag, type, stateNode } = fiberNode;

  switch (tag) {
    case EA: // EA and handleCommitAndRenderIdleEvents are fiber tags for class components
    case handleCommitAndRenderIdleEvents:
      // Check if the static method getDerivedStateFromError exists on the component type
      // or if the instance method componentDidCatch exists on the component instance
      const hasStaticErrorHandler = typeof type.getDerivedStateFromError === "function";
      const hasInstanceErrorHandler = stateNode !== null && typeof stateNode.componentDidCatch === "function";
      return hasStaticErrorHandler || hasInstanceErrorHandler;
    default:
      return false;
  }
}

module.exports = hasErrorHandlingLifecycle;