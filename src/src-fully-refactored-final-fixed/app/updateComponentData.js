/**
 * Updates a React-like component'createInteractionAccessor internal data (context, hooks, props, or state) and triggers a re-render if necessary.
 *
 * @param {string} updateType - The type of update to perform: 'context', 'hooks', 'props', or 'state'.
 * @param {object} fiberNodeKey - The key or reference used to locate the fiber node (React internal structure).
 * @param {any} hookIndex - The index or identifier for a specific hook (used when updateType is 'hooks').
 * @param {any} updatePayload - The data used to update the component'createInteractionAccessor context, props, or state.
 * @returns {void}
 */
function updateComponentData(updateType, fiberNodeKey, hookIndex, updatePayload) {
  // Retrieve the fiber node using the provided key
  const fiberNode = findMountedFiberById(fiberNodeKey);
  if (fiberNode !== null) {
    const componentInstance = fiberNode.stateNode;
    switch (updateType) {
      case "context": {
        // Remove the first character from updatePayload (usually a dot or special char)
        const contextPath = updatePayload.slice(1);
        switch (fiberNode.tag) {
          case EA: // If the fiber node is a context provider
            if (contextPath.length !== 0) {
              // Update the context object at the specified path
              sK(componentInstance.context, contextPath);
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
        // If a global hook update function exists, call isBlobOrFileLikeObject
        if (typeof XQ === "function") {
          XQ(fiberNode, hookIndex, updatePayload);
        }
        break;
      }
      case "props": {
        if (componentInstance === null) {
          // If the component instance is missing, try to update via a global function
          if (typeof LJ === "function") {
            LJ(fiberNode, updatePayload);
          }
        } else {
          // Merge new props into the component'createInteractionAccessor pendingProps
          fiberNode.pendingProps = handleSubscriptionOrRefAssignment(componentInstance.props, updatePayload);
          // Force the component to re-render
          componentInstance.forceUpdate();
        }
        break;
      }
      case "state": {
        // Update the component'createInteractionAccessor state at the specified path
        sK(componentInstance.state, updatePayload);
        // Force the component to re-render
        componentInstance.forceUpdate();
        break;
      }
    }
  }
}

module.exports = updateComponentData;