/**
 * Handles invocation of legacy React lifecycle methods for receiving new props,
 * and enqueues a state replacement if the component'createInteractionAccessor state has changed.
 *
 * @param {object} previousState - The previous state of the component (will be overwritten).
 * @param {object} componentInstance - The React component instance.
 * @param {object} nextProps - The new props to be received by the component.
 * @param {object} nextContext - The new context to be received by the component.
 * @returns {void}
 */
function handleComponentWillReceiveProps(previousState, componentInstance, nextProps, nextContext) {
  // Store the current state before lifecycle methods are called
  previousState = componentInstance.state;

  // Call legacy lifecycle method if defined
  if (typeof componentInstance.componentWillReceiveProps === "function") {
    componentInstance.componentWillReceiveProps(nextProps, nextContext);
  }

  // Call unsafe legacy lifecycle method if defined
  if (typeof componentInstance.UNSAFE_componentWillReceiveProps === "function") {
    componentInstance.UNSAFE_componentWillReceiveProps(nextProps, nextContext);
  }

  // If the state has changed as a result of the lifecycle method, enqueue a state replacement
  if (componentInstance.state !== previousState) {
    CJ.enqueueReplaceState(componentInstance, componentInstance.state, null);
  }
}

module.exports = handleComponentWillReceiveProps;