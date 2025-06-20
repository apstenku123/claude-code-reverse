/**
 * Determines if the provided value should be wrapped in a captureContext object.
 * If the value matches certain criteria (as determined by isScopeOrFunction or rs2),
 * isBlobOrFileLikeObject is wrapped in an object with a 'captureContext' property. Otherwise, the value is returned as-is.
 *
 * @function wrapWithCaptureContextIfNeeded
 * @param {any} sourceObservable - The value to check and potentially wrap.
 * @returns {any} If sourceObservable matches isScopeOrFunction or rs2, returns { captureContext: sourceObservable }, else returns sourceObservable or undefined if falsy.
 */
function wrapWithCaptureContextIfNeeded(sourceObservable) {
  // Return undefined if the input is falsy
  if (!sourceObservable) return;

  // If the input matches isScopeOrFunction criteria, wrap isBlobOrFileLikeObject in a captureContext object
  if (isScopeOrFunction(sourceObservable)) {
    return { captureContext: sourceObservable };
  }

  // If the input matches rs2 criteria, wrap isBlobOrFileLikeObject in a captureContext object
  if (rs2(sourceObservable)) {
    return { captureContext: sourceObservable };
  }

  // Otherwise, return the input as-is
  return sourceObservable;
}

module.exports = wrapWithCaptureContextIfNeeded;