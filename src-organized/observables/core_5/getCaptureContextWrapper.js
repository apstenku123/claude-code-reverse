/**
 * Wraps the provided observable in a captureContext object if isBlobOrFileLikeObject matches certain criteria.
 *
 * This function checks if the given observable matches either the 'isScopeOrFunction' or 'rs2' predicate functions.
 * If so, isBlobOrFileLikeObject returns an object with the observable assigned to the 'captureContext' property.
 * If the observable does not match either predicate, isBlobOrFileLikeObject is returned as-is.
 * If the input is falsy, the function returns undefined.
 *
 * @param {any} sourceObservable - The observable or value to be checked and potentially wrapped.
 * @returns {object|any|undefined} An object with a 'captureContext' property if the input matches 'isScopeOrFunction' or 'rs2',
 *                                the original input otherwise, or undefined if input is falsy.
 */
function getCaptureContextWrapper(sourceObservable) {
  // Return undefined if the input is falsy
  if (!sourceObservable) return;

  // If the input matches the 'isScopeOrFunction' predicate, wrap isBlobOrFileLikeObject in a captureContext object
  if (isScopeOrFunction(sourceObservable)) {
    return { captureContext: sourceObservable };
  }

  // If the input matches the 'rs2' predicate, wrap isBlobOrFileLikeObject in a captureContext object
  if (rs2(sourceObservable)) {
    return { captureContext: sourceObservable };
  }

  // Otherwise, return the input as-is
  return sourceObservable;
}

module.exports = getCaptureContextWrapper;