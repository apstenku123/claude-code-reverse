/**
 * Determines the type of the provided observable source by checking against known observable types.
 *
 * This function checks if the given sourceObservable matches any of the supported observable types:
 * - Standard Observable (isTextOrBinaryType)
 * - Async Observable (isContinuationStatus)
 * - Node Observable (isWebSocketControlFrame)
 *
 * The first matching type is returned. If none match, returns undefined.
 *
 * @param {any} sourceObservable - The observable source to check.
 * @returns {any} The result of the first matching observable type check, or undefined if none match.
 */
function getObservableType(sourceObservable) {
  // Try standard observable check
  // If not matched, try async observable check
  // If still not matched, try node observable check
  return isTextOrBinaryType(sourceObservable) || isContinuationStatus(sourceObservable) || isWebSocketControlFrame(sourceObservable);
}

module.exports = getObservableType;
