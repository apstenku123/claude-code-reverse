/**
 * Retrieves class names from the provided observable source using the handleInteractionAndTransaction utility.
 *
 * @param {Observable} sourceObservable - The observable source from which to retrieve class names.
 * @param {boolean} [shouldForceUpdate=false] - Optional flag to force update the class names.
 * @returns {string} The computed class names as a string.
 */
function getClassNamesFromObservable(sourceObservable, shouldForceUpdate = false) {
  // Calls the handleInteractionAndTransaction utility with the 'cls' key, the observable source, and additional dependencies
  // Q89 and JIA are assumed to be required for class name computation
  return handleInteractionAndTransaction("cls", sourceObservable, Q89, JIA, shouldForceUpdate);
}

module.exports = getClassNamesFromObservable;