/**
 * Initializes or updates the memoized render state for a given fiber node.
 *
 * If the fiber node'createInteractionAccessor memoizedState is null, isBlobOrFileLikeObject creates a new state object with the provided parameters.
 * Otherwise, isBlobOrFileLikeObject updates the existing state with the new values.
 *
 * @param {Object} fiberNode - The fiber node whose render state is being managed.
 * @param {boolean} isBackwards - Indicates if rendering should proceed backwards.
 * @param {Array|Object} tailQueue - The queue or list representing the tail to be rendered.
 * @param {any} lastRenderedItem - The last item that was rendered.
 * @param {string} tailMode - The mode in which the tail should be rendered.
 * @returns {void}
 */
function initializeOrUpdateRenderState(fiberNode, isBackwards, tailQueue, lastRenderedItem, tailMode) {
  // Access the memoized state of the fiber node
  let renderState = fiberNode.memoizedState;

  if (renderState === null) {
    // If no state exists, initialize isBlobOrFileLikeObject with the provided parameters
    fiberNode.memoizedState = {
      isBackwards: isBackwards,
      rendering: null, // No current rendering in progress
      renderingStartTime: 0, // Reset rendering start time
      last: lastRenderedItem,
      tail: tailQueue,
      tailMode: tailMode
    };
  } else {
    // Update the existing state with new values
    renderState.isBackwards = isBackwards;
    renderState.rendering = null;
    renderState.renderingStartTime = 0;
    renderState.last = lastRenderedItem;
    renderState.tail = tailQueue;
    renderState.tailMode = tailMode;
  }
}

module.exports = initializeOrUpdateRenderState;