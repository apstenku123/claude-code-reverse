/**
 * Returns a display name string for a given React-like component node based on its tag and type.
 *
 * @param {Object} componentNode - The component node object containing a 'tag' and 'type' property.
 * @returns {string} The display name for the component, or an empty string if not recognized.
 */
function getComponentDisplayName(componentNode) {
  switch (componentNode.tag) {
    case 5:
      // Host component (e.g., 'div', 'span')
      return prependStackTraceIndentation(componentNode.type);
    case 16:
      // Lazy-loaded component
      return prependStackTraceIndentation("Lazy");
    case 13:
      // Suspense component
      return prependStackTraceIndentation("Suspense");
    case 19:
      // SuspenseList component
      return prependStackTraceIndentation("SuspenseList");
    case 0:
    case 2:
    case 15:
      // Function component, ForwardRef, or Memo
      // The second argument 'false' indicates not a class component
      return getComponentStackFrame(componentNode.type, false);
    case 11:
      // Context Consumer component
      // Use the render method of the type
      return getComponentStackFrame(componentNode.type.render, false);
    case 1:
      // Class component
      // The second argument 'true' indicates a class component
      return getComponentStackFrame(componentNode.type, true);
    default:
      // Unknown or unsupported component type
      return "";
  }
}

module.exports = getComponentDisplayName;