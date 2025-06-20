/**
 * Updates a component instance based on the specified update type (context, hooks, props, or state).
 *
 * @param {string} updateType - The type of update to perform ("context", "hooks", "props", or "state").
 * @param {object} fiberNode - The React fiber node representing the component instance.
 * @param {any} hookOrPropIndex - Index or identifier for hooks or props (used for hooks updates).
 * @param {Array|string} updatePath - Path or key(createInteractionAccessor) to update within context, props, or state.
 * @param {any} newValue - The new value to set at the specified path.
 * @returns {void}
 *
 * This function handles updates to a React component instance'createInteractionAccessor context, hooks, props, or state,
 * and triggers a re-render if necessary. It uses helper functions and constants such as findMountedFiberById(to get the fiber node),
 * jW (to set values at a path), TC (to update props), RJ (to update props when stateNode is null),
 * and handleRenderLifecycleEvent(to update hooks). It also checks the fiber node'createInteractionAccessor tag to determine the update strategy for context.
 */
function updateComponentInstance(updateType, fiberNodeKey, hookOrPropIndex, updatePath, newValue) {
  const fiberNodeInstance = findMountedFiberById(fiberNodeKey);
  if (fiberNodeInstance !== null) {
    const componentInstance = fiberNodeInstance.stateNode;
    switch (updateType) {
      case "context": {
        // Remove first element from updatePath and newValue arrays
        const contextPath = updatePath.slice(1);
        const contextValue = newValue.slice(1);
        switch (fiberNodeInstance.tag) {
          case EA: // If fiber node is of type EA
            if (contextPath.length !== 0) {
              // Update context at the specified path
              jW(componentInstance.context, contextPath, contextValue);
            }
            componentInstance.forceUpdate();
            break;
          case getSetBitsAsPowersOfTwo: // If fiber node is of type getSetBitsAsPowersOfTwo, do nothing
            break;
        }
        break;
      }
      case "hooks": {
        // If handleRenderLifecycleEvent is a function, update hooks
        if (typeof handleRenderLifecycleEvent === "function") {
          handleRenderLifecycleEvent(fiberNodeInstance, hookOrPropIndex, updatePath, newValue);
        }
        break;
      }
      case "props": {
        if (componentInstance === null) {
          // If there is no stateNode, use RJ to update props
          if (typeof RJ === "function") {
            RJ(fiberNodeInstance, updatePath, newValue);
          }
        } else {
          // Otherwise, update pendingProps and force update
          fiberNodeInstance.pendingProps = TC(componentInstance.props, updatePath, newValue);
          componentInstance.forceUpdate();
        }
        break;
      }
      case "state": {
        // Update state at the specified path and force update
        jW(componentInstance.state, updatePath, newValue);
        componentInstance.forceUpdate();
        break;
      }
    }
  }
}

module.exports = updateComponentInstance;