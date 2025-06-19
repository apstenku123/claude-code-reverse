/**
 * Determines if a given React component type or instance is capable of handling errors.
 * Specifically, checks if the component is a class or function component that implements
 * either the static method `getDerivedStateFromError` or the instance method `componentDidCatch`.
 *
 * @param {Object} fiberNode - The React Fiber node representing the component.
 * @param {number|string} fiberNode.tag - The type tag of the component (e.g., class, function, etc.).
 * @param {Object} fiberNode.type - The component'createInteractionAccessor type definition (class or function).
 * @param {Object|null} fiberNode.stateNode - The component instance, if applicable.
 * @returns {boolean} True if the component can handle errors, false otherwise.
 */
function doesComponentHandleError(fiberNode) {
  const {
    tag: componentTag,
    type: componentType,
    stateNode: componentInstance
  } = fiberNode;

  // Check if the component is a class or function component that can handle errors
  switch (componentTag) {
    case EA: // Class component
    case handleCommitAndRenderIdleEvents: // Possibly another error-capable component type
      // Check for static getDerivedStateFromError or instance componentDidCatch
      const hasStaticErrorHandler = typeof componentType.getDerivedStateFromError === "function";
      const hasInstanceErrorHandler = componentInstance !== null && typeof componentInstance.componentDidCatch === "function";
      return hasStaticErrorHandler || hasInstanceErrorHandler;
    default:
      return false;
  }
}

module.exports = doesComponentHandleError;