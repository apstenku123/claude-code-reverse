/**
 * Attempts to set the next value on the source observable if isBlobOrFileLikeObject is currently in template insertion mode.
 * If not in insertion mode, marks the observable as stopped.
 *
 * @param {Object} sourceObservable - The observable object whose value may be set.
 *   Expected to have properties: tmplInsertionModeStackTop (number), stopped (boolean).
 * @param {any} config - The configuration or value to be passed to handleTemplateInsertionMode for setting the next value.
 * @returns {void}
 */
function setNextValueIfInserting(sourceObservable, config) {
  // Check if the observable is in template insertion mode
  if (sourceObservable.tmplInsertionModeStackTop > -1) {
    // Delegate to handleTemplateInsertionMode to set the next value
    handleTemplateInsertionMode(sourceObservable, config);
  } else {
    // Not in insertion mode; mark the observable as stopped
    sourceObservable.stopped = true;
  }
}

module.exports = setNextValueIfInserting;