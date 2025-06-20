/**
 * Updates the internal state, props, context, or hooks of a React-like component instance.
 *
 * @param {string} updateType - The type of update to perform ("context", "hooks", "props", or "state").
 * @param {any} fiberNode - The fiber node representing the component instance.
 * @param {any} hookIndexOrPropPath - The index for hooks, or the path for props/state/context updates.
 * @param {string|string[]} propertyPath - The property path to update (for context, props, or state). May be a string or array.
 * @param {any} newValue - The new value to set at the specified property path.
 * @returns {void}
 */
function updateComponentInternalState(updateType, fiberNode, hookIndexOrPropPath, propertyPath, newValue) {
  // Retrieve the fiber node instance using the provided lookup function
  const resolvedFiber = findMountedFiberById(fiberNode);
  if (resolvedFiber !== null) {
    const componentInstance = resolvedFiber.stateNode;
    switch (updateType) {
      case "context": {
        // Remove the first character from the property path (e.g., ".foo" -> "foo")
        const contextPath = propertyPath.slice(1);
        switch (resolvedFiber.tag) {
          case EA: // Class component
            if (contextPath.length === 0) {
              // Set the entire context object
              componentInstance.context = newValue;
            } else {
              // Update a nested property in the context object
              zE(componentInstance.context, contextPath, newValue);
            }
            // Trigger a re-render
            componentInstance.forceUpdate();
            break;
          case getSetBitsAsPowersOfTwo: // Function component (no-op for context)
            break;
        }
        break;
      }
      case "hooks": {
        // Delegate hook update to external handler if available
        if (typeof handlePassiveEffects === "function") {
          handlePassiveEffects(resolvedFiber, hookIndexOrPropPath, propertyPath, newValue);
        }
        break;
      }
      case "props": {
        switch (resolvedFiber.tag) {
          case EA: // Class component
            // Update pendingProps using the external FJ function
            resolvedFiber.pendingProps = FJ(componentInstance.props, propertyPath, newValue);
            componentInstance.forceUpdate();
            break;
          default:
            // Delegate prop update to external handler if available
            if (typeof MJ === "function") {
              MJ(resolvedFiber, propertyPath, newValue);
            }
            break;
        }
        break;
      }
      case "state": {
        switch (resolvedFiber.tag) {
          case EA: // Class component
            // Update a nested property in the state object
            zE(componentInstance.state, propertyPath, newValue);
            componentInstance.forceUpdate();
            break;
        }
        break;
      }
    }
  }
}

module.exports = updateComponentInternalState;