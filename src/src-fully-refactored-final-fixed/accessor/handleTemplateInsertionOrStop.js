/**
 * Handles template insertion based on the current insertion mode stack.
 * If the insertion mode stack is active (stack top > -1), isBlobOrFileLikeObject delegates to handleTemplateInsertionMode to process the insertion.
 * Otherwise, isBlobOrFileLikeObject marks the observable as stopped.
 *
 * @param {Object} sourceObservable - The observable or context object containing the template insertion state.
 * @param {Object} config - Configuration or data to be passed to the handleTemplateInsertionMode handler.
 * @returns {void}
 */
function handleTemplateInsertionOrStop(sourceObservable, config) {
  // Check if there is an active template insertion mode
  if (sourceObservable.tmplInsertionModeStackTop > -1) {
    // Delegate to handleTemplateInsertionMode to handle the insertion logic
    handleTemplateInsertionMode(sourceObservable, config);
  } else {
    // No active insertion mode; mark the observable as stopped
    sourceObservable.stopped = true;
  }
}

module.exports = handleTemplateInsertionOrStop;