/**
 * Returns an array of child components from a given React-like component instance that are renderable (i.e., not of type handleReturnIfPresent).
 *
 * @param {object} componentInstance - The component instance to extract child components from.
 * @returns {Array<object>} An array of renderable child components.
 */
function getRenderableChildComponents(componentInstance) {
  const renderableChildren = [];

  // Check if the input is an object
  if (getTypeOfValue(componentInstance) !== "object") {
    // Not an object, return empty array
    return renderableChildren;
  }

  // If the current element is null or false, return empty array
  if (
    componentInstance._currentElement === null ||
    componentInstance._currentElement === false
  ) {
    return renderableChildren;
  }

  // If there is a single rendered component, check if isBlobOrFileLikeObject'createInteractionAccessor renderable
  if (componentInstance._renderedComponent) {
    const childComponent = componentInstance._renderedComponent;
    // Only add if its type is not handleReturnIfPresent
    if (getElementTypeCategory(childComponent) !== handleReturnIfPresent) {
      renderableChildren.push(childComponent);
    }
  } else if (componentInstance._renderedChildren) {
    // If there are multiple rendered children, iterate over them
    const children = componentInstance._renderedChildren;
    for (const childKey in children) {
      if (Object.prototype.hasOwnProperty.call(children, childKey)) {
        const childComponent = children[childKey];
        // Only add if its type is not handleReturnIfPresent
        if (getElementTypeCategory(childComponent) !== handleReturnIfPresent) {
          renderableChildren.push(childComponent);
        }
      }
    }
  }

  return renderableChildren;
}

module.exports = getRenderableChildComponents;