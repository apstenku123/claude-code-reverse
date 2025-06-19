/**
 * Sets the current fiber reference for debugging or inspection tools based on the fiber'createInteractionAccessor tag and properties.
 *
 * @param {Object} fiberContext - The context object containing hooks, id, and props for the fiber.
 * @param {Array} fiberContext.hooks - The hooks associated with the fiber.
 * @param {string|number} fiberContext.id - The unique identifier for the fiber.
 * @param {Object} fiberContext.props - The props associated with the fiber.
 * @returns {void}
 */
function setCurrentFiberReference(fiberContext) {
  const {
    hooks,
    id: fiberId,
    props
  } = fiberContext;

  // Retrieve the fiber object from the fiber map using the provided id
  const fiber = resolveNodeValue.get(fiberId);

  if (fiber == null) {
    console.warn(`Could not find Fiber with id "${fiberId}"`);
    return;
  }

  const {
    elementType,
    stateNode,
    tag: fiberTag,
    type: fiberType
  } = fiber;

  // Set the current reference based on the fiber'createInteractionAccessor tag
  switch (fiberTag) {
    case EA: // HostRoot
    case handleCommitAndRenderIdleEvents: // HostComponent
    case F8: // HostText
      // For host fibers, set the reference to the state node (DOM node or component instance)
      u.$r = stateNode;
      break;
    case containsValueAtIndex: // FunctionComponent
    case getSetBitsAsPowersOfTwo: // ForwardRef
      // For function components, set the reference to an object with hooks, props, and type
      u.$r = {
        hooks,
        props,
        type: fiberType
      };
      break;
    case K2: // MemoComponent
      // For memo components, set the reference to an object with hooks, props, and the render function
      u.$r = {
        hooks,
        props,
        type: fiberType.render
      };
      break;
    case C5: // ContextProvider
    case finalizeComponentLayoutEffect: // ContextConsumer
      // For context components, set the reference to an object with hooks, props, and the context type
      u.$r = {
        hooks,
        props,
        type: (elementType != null && elementType.type != null) ? elementType.type : fiberType
      };
      break;
    default:
      // For any other fiber tag, clear the reference
      u.$r = null;
      break;
  }
}

module.exports = setCurrentFiberReference;