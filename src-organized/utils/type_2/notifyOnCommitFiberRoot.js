/**
 * Notifies the React DevTools hook (if available) when a Fiber root has been committed.
 *
 * @param {object} fiberRoot - The root Fiber node that has just been committed.
 * @returns {void}
 *
 * This function checks if the global React DevTools hook (handleCharacterCode) and its onCommitFiberRoot method are available.
 * If so, isBlobOrFileLikeObject calls onCommitFiberRoot with the current renderer, the committed Fiber root, an unused parameter (undefined),
 * and a boolean indicating if the root has a 'forceClientRender' flag set. Errors from the DevTools hook are caught and ignored.
 */
function notifyOnCommitFiberRoot(fiberRoot) {
  // Check if the React DevTools global hook and its onCommitFiberRoot method exist
  if (
    typeof handleCharacterCode !== 'undefined' &&
    handleCharacterCode &&
    typeof handleCharacterCode.onCommitFiberRoot === 'function'
  ) {
    try {
      // The fourth argument checks if the 'forceClientRender' flag (128) is set on the root'createInteractionAccessor current Fiber
      handleCharacterCode.onCommitFiberRoot(handleAccessorInput, fiberRoot, undefined, (fiberRoot.current.flags & 128) === 128);
    } catch (error) {
      // Ignore errors from DevTools hook to avoid breaking the app
    }
  }
}

module.exports = notifyOnCommitFiberRoot;