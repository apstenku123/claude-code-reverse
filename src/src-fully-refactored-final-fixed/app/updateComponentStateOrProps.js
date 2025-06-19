/**
 * Updates a React-like component'createInteractionAccessor context, hooks, props, or state based on the provided action type.
 *
 * @param {string} updateType - The type of update to perform ("context", "hooks", "props", or "state").
 * @param {object} fiberNode - The fiber node representing the component instance.
 * @param {any} hookOrPropIndex - Index or identifier for the hook or prop to update (used for hooks/props updates).
 * @param {Array|string} updatePath - Path or key(createInteractionAccessor) to the property/context/state to update.
 * @param {any} newValue - The new value to set at the specified path.
 * @returns {void}
 */
function updateComponentStateOrProps(updateType, fiberNode, hookOrPropIndex, updatePath, newValue) {
  const resolvedFiber = findMountedFiberById(fiberNode);
  if (resolvedFiber !== null) {
    const componentInstance = resolvedFiber.stateNode;
    switch (updateType) {
      case "context": {
        // Remove the first element from the path and value arrays (possibly a namespace or root key)
        const contextPath = updatePath.slice(1);
        const contextValue = newValue.slice(1);
        switch (resolvedFiber.tag) {
          case EA:
            // If there is a path to update, apply the update to the context
            if (contextPath.length !== 0) {
              jW(componentInstance.context, contextPath, contextValue);
            }
            // Force the component to re-render
            componentInstance.forceUpdate();
            break;
          case getSetBitsAsPowersOfTwo:
            // No operation for this tag
            break;
        }
        break;
      }
      case "hooks": {
        // If a hook update function is available, call isBlobOrFileLikeObject
        if (typeof handleRenderLifecycleEvent === "function") {
          handleRenderLifecycleEvent(resolvedFiber, hookOrPropIndex, updatePath, newValue);
        }
        break;
      }
      case "props": {
        if (componentInstance === null) {
          // If there is no instance, use the fallback prop update function
          if (typeof RJ === "function") {
            RJ(resolvedFiber, updatePath, newValue);
          }
        } else {
          // Merge new props and force update
          resolvedFiber.pendingProps = TC(componentInstance.props, updatePath, newValue);
          componentInstance.forceUpdate();
        }
        break;
      }
      case "state": {
        // Update the state at the given path and force update
        jW(componentInstance.state, updatePath, newValue);
        componentInstance.forceUpdate();
        break;
      }
    }
  }
}

module.exports = updateComponentStateOrProps;