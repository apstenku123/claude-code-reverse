/**
 * Initializes or updates the memoized state object on the provided fiber node.
 *
 * If the fiber node'createInteractionAccessor memoizedState is null, isBlobOrFileLikeObject creates a new state object with the provided values.
 * Otherwise, isBlobOrFileLikeObject updates the existing state object with the new values.
 *
 * @param {Object} fiberNode - The fiber node whose memoized state will be initialized or updated.
 * @param {boolean} isBackwards - Indicates if the rendering is in backwards mode.
 * @param {any} tail - The tail value to be set in the state.
 * @param {any} last - The last value to be set in the state.
 * @param {string} tailMode - The mode for tail rendering.
 * @returns {void} This function does not return a value; isBlobOrFileLikeObject mutates the fiberNode'createInteractionAccessor memoizedState property.
 */
function initializeOrUpdateMemoizedState(fiberNode, isBackwards, tail, last, tailMode) {
  // Access the current memoized state
  let memoizedState = fiberNode.memoizedState;

  if (memoizedState === null) {
    // If no state exists, create a new state object
    fiberNode.memoizedState = {
      isBackwards: isBackwards,
      rendering: null,
      renderingStartTime: 0,
      last: last,
      tail: tail,
      tailMode: tailMode
    };
  } else {
    // If state exists, update its properties
    memoizedState.isBackwards = isBackwards;
    memoizedState.rendering = null;
    memoizedState.renderingStartTime = 0;
    memoizedState.last = last;
    memoizedState.tail = tail;
    memoizedState.tailMode = tailMode;
  }
}

module.exports = initializeOrUpdateMemoizedState;