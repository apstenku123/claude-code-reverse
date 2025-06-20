/**
 * Handles the insertion mode for a template observable. If the insertion mode stack is active, 
 * isBlobOrFileLikeObject delegates to the handleTemplateInsertionMode function to process the insertion. Otherwise, isBlobOrFileLikeObject marks the observable as stopped.
 *
 * @param {Object} templateObservable - The observable or context object representing the template.
 * @param {Object} config - Configuration or data to be passed to the handleTemplateInsertionMode handler.
 * @returns {void}
 */
function handleTemplateInsertionMode(templateObservable, config) {
  // Check if the insertion mode stack is active
  if (templateObservable.tmplInsertionModeStackTop > -1) {
    // Delegate to handleTemplateInsertionMode to handle the insertion logic
    handleTemplateInsertionMode(templateObservable, config);
  } else {
    // Mark the observable as stopped if insertion mode is not active
    templateObservable.stopped = true;
  }
}

module.exports = handleTemplateInsertionMode;