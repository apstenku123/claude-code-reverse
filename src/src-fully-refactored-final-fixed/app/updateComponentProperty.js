/**
 * Updates a component'createInteractionAccessor context, hooks, props, or state based on the provided type and parameters.
 *
 * @param {string} updateType - The type of update to perform ("context", "hooks", "props", or "state").
 * @param {object} fiberNode - The fiber node representing the component instance.
 * @param {any} hookIndexOrPropsPath - The hook index (for hooks) or the property path (for props/state/context).
 * @param {string[]} propertyPath - The path to the property to update (as an array of strings).
 * @param {any} newValue - The new value to set at the specified property path.
 * @returns {void}
 */
function updateComponentProperty(updateType, fiberNode, hookIndexOrPropsPath, propertyPath, newValue) {
  const resolvedFiber = findMountedFiberById(fiberNode);
  if (resolvedFiber !== null) {
    const componentInstance = resolvedFiber.stateNode;
    switch (updateType) {
      case "context": {
        // Remove the first element from propertyPath (usually the context key)
        const contextPath = propertyPath.slice(1);
        switch (resolvedFiber.tag) {
          case EA:
            if (contextPath.length === 0) {
              // Set the entire context object
              componentInstance.context = newValue;
            } else {
              // Set a nested property in the context object
              zE(componentInstance.context, contextPath, newValue);
            }
            componentInstance.forceUpdate();
            break;
          case getSetBitsAsPowersOfTwo:
            // No operation for this tag
            break;
        }
        break;
      }
      case "hooks": {
        // Delegate to external hook update function if available
        if (typeof handlePassiveEffects === "function") {
          handlePassiveEffects(resolvedFiber, hookIndexOrPropsPath, propertyPath, newValue);
        }
        break;
      }
      case "props": {
        switch (resolvedFiber.tag) {
          case EA:
            // Update props and trigger re-render
            resolvedFiber.pendingProps = FJ(componentInstance.props, propertyPath, newValue);
            componentInstance.forceUpdate();
            break;
          default:
            // Delegate to external prop update function if available
            if (typeof MJ === "function") {
              MJ(resolvedFiber, propertyPath, newValue);
            }
            break;
        }
        break;
      }
      case "state": {
        switch (resolvedFiber.tag) {
          case EA:
            // Update state and trigger re-render
            zE(componentInstance.state, propertyPath, newValue);
            componentInstance.forceUpdate();
            break;
        }
        break;
      }
    }
  }
}

module.exports = updateComponentProperty;