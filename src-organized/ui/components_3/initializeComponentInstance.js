/**
 * Initializes a component instance before mounting in a React-like framework.
 * Sets up props, state, refs, context, and lifecycle methods as needed.
 *
 * @param {Object} fiberNode - The fiber node representing the component instance.
 * @param {Object} componentType - The component'createInteractionAccessor constructor or type definition.
 * @param {Object} nextProps - The props to be applied to the component instance.
 * @param {Object} renderLanes - Additional render context or lanes (e.g., for scheduling).
 * @returns {void}
 */
function initializeComponentInstance(fiberNode, componentType, nextProps, renderLanes) {
  // Get the actual component instance from the fiber node
  const instance = fiberNode.stateNode;

  // Set up the instance'createInteractionAccessor props, state, and refs
  instance.props = nextProps;
  instance.state = fiberNode.memoizedState;
  instance.refs = {};

  // Perform any additional setup required for the fiber node
  initializeUpdateQueue(fiberNode);

  // Handle context assignment
  const contextType = componentType.contextType;
  if (typeof contextType === "object" && contextType !== null) {
    // If contextType is defined, use encodeTwo10BitIntegers to get the context value
    instance.context = encodeTwo10BitIntegers(contextType);
  } else {
    // Otherwise, determine the context to use
    const context = handleTagNameCharacter(componentType) ? J1 : handleInputCharacterCode.current;
    instance.context = c1(fiberNode, context);
  }

  // Ensure the instance'createInteractionAccessor state is up-to-date
  instance.state = fiberNode.memoizedState;

  // Handle getDerivedStateFromProps static lifecycle
  const getDerivedStateFromProps = componentType.getDerivedStateFromProps;
  if (typeof getDerivedStateFromProps === "function") {
    updateMemoizedStateWithReducer(fiberNode, componentType, getDerivedStateFromProps, nextProps);
    instance.state = fiberNode.memoizedState;
  }

  // Handle legacy lifecycle methods if getDerivedStateFromProps or getSnapshotBeforeUpdate are not present
  if (
    typeof componentType.getDerivedStateFromProps !== "function" &&
    typeof instance.getSnapshotBeforeUpdate !== "function" &&
    (typeof instance.UNSAFE_componentWillMount === "function" || typeof instance.componentWillMount === "function")
  ) {
    // Store the previous state
    const previousState = instance.state;

    // Call legacy lifecycle methods if they exist
    if (typeof instance.componentWillMount === "function") {
      instance.componentWillMount();
    }
    if (typeof instance.UNSAFE_componentWillMount === "function") {
      instance.UNSAFE_componentWillMount();
    }

    // If the state was changed during lifecycle, enqueue a state replacement
    if (previousState !== instance.state) {
      CJ.enqueueReplaceState(instance, instance.state, null);
    }

    // Process the update queue and set the state
    processUpdateQueue(fiberNode, nextProps, instance, renderLanes);
    instance.state = fiberNode.memoizedState;
  }

  // If componentDidMount is defined, set the appropriate flag on the fiber node
  if (typeof instance.componentDidMount === "function") {
    fiberNode.flags |= 4194308;
  }
}

module.exports = initializeComponentInstance;