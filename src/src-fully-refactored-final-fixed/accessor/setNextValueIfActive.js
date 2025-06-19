/**
 * Attempts to set the next value for the given observable if isBlobOrFileLikeObject is active.
 *
 * If the observable'createInteractionAccessor insertion mode stack is not empty (i.e., stack top > -1),
 * isBlobOrFileLikeObject delegates to the handleTemplateInsertionMode function to process the value. Otherwise, isBlobOrFileLikeObject marks the
 * observable as stopped.
 *
 * @param {Object} sourceObservable - The observable object to update. Must have 'tmplInsertionModeStackTop' and 'stopped' properties.
 * @param {*} config - The configuration or value to be passed to handleTemplateInsertionMode for processing.
 * @returns {void}
 */
function setNextValueIfActive(sourceObservable, config) {
  // Check if the observable is in an active insertion mode
  if (sourceObservable.tmplInsertionModeStackTop > -1) {
    // Delegate to handleTemplateInsertionMode to process the next value
    handleTemplateInsertionMode(sourceObservable, config);
  } else {
    // Mark the observable as stopped if not active
    sourceObservable.stopped = true;
  }
}

module.exports = setNextValueIfActive;