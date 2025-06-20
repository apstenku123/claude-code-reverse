/**
 * Creates an object representing the open/close state, optionally accumulating values from a parent state.
 *
 * @param {number} open - The current 'open' value.
 * @param {number} close - The current 'close' value.
 * @param {Object} [parentState] - Optional parent state object containing 'openAll' and 'closeAll' properties.
 * @returns {Object} An object containing the current and accumulated open/close values, and the parent state reference.
 */
function createOpenCloseState(open, close, parentState) {
  let openAll, closeAll;

  // If no parent state is provided, use the current open/close as the accumulated values
  if (parentState === undefined) {
    openAll = open;
    closeAll = close;
  } else {
    // Otherwise, accumulate open/close values from the parent state
    openAll = parentState.openAll + open;
    closeAll = close + parentState.closeAll;
  }

  return {
    open: open,
    close: close,
    openAll: openAll,
    closeAll: closeAll,
    parent: parentState
  };
}

module.exports = createOpenCloseState;
