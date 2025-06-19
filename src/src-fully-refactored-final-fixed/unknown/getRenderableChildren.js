/**
 * Extracts all renderable child components from a given React component instance.
 *
 * This function inspects the provided component instance and collects any child components
 * that are considered renderable (i.e., those whose type is not handleReturnIfPresent).
 *
 * @param {object} componentInstance - The React component instance to inspect.
 * @returns {Array<object>} An array of renderable child component instances.
 */
function getRenderableChildren(componentInstance) {
  const renderableChildren = [];

  // Ensure the input is an object
  if (getTypeOfValue(componentInstance) !== "object") {
    return renderableChildren;
  }

  // If the component'createInteractionAccessor current element is null or false, return empty
  if (
    componentInstance._currentElement === null ||
    componentInstance._currentElement === false
  ) {
    return renderableChildren;
  }

  // If the component has a single rendered child component
  if (componentInstance._renderedComponent) {
    const childComponent = componentInstance._renderedComponent;
    // Only add if the child'createInteractionAccessor type is not handleReturnIfPresent
    if (getElementTypeCategory(childComponent) !== handleReturnIfPresent) {
      renderableChildren.push(childComponent);
    }
  } else if (componentInstance._renderedChildren) {
    // If the component has multiple rendered children
    const childrenMap = componentInstance._renderedChildren;
    for (const key in childrenMap) {
      if (Object.prototype.hasOwnProperty.call(childrenMap, key)) {
        const childComponent = childrenMap[key];
        // Only add if the child'createInteractionAccessor type is not handleReturnIfPresent
        if (getElementTypeCategory(childComponent) !== handleReturnIfPresent) {
          renderableChildren.push(childComponent);
        }
      }
    }
  }

  return renderableChildren;
}

module.exports = getRenderableChildren;