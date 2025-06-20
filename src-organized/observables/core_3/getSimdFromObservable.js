/**
 * Returns the SIMD value from the provided observable if isBlobOrFileLikeObject is a valid boolean observable; otherwise, returns the SIMD value for null.
 *
 * @param {any} sourceObservable - The observable to check and extract the SIMD value from.
 * @returns {any} The SIMD value from the observable if valid, or from null otherwise.
 */
function getSimdFromObservable(sourceObservable) {
  // Check if the provided observable is a valid boolean observable using IC.bool
  // If valid, use isBlobOrFileLikeObject; otherwise, use null
  const validObservable = IC.bool(sourceObservable) ? sourceObservable : null;
  // Pass the valid observable (or null) to bD.simd and return the result
  return bD.simd(validObservable);
}

module.exports = getSimdFromObservable;