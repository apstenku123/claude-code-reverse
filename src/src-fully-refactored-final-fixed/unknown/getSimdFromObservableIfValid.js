/**
 * Returns the SIMD (Single Instruction, Multiple Data) result from the provided observable if isBlobOrFileLikeObject is valid, otherwise returns the result for null.
 *
 * @param {any} sourceObservable - The observable or value to be checked and passed to the SIMD function.
 * @returns {any} The result of bD.simd with the observable if valid, or with null otherwise.
 */
function getSimdFromObservableIfValid(sourceObservable) {
  // Check if the provided observable is valid using IC.bool
  // If valid, pass isBlobOrFileLikeObject to bD.simd; otherwise, pass null
  const isValidObservable = IC.bool(sourceObservable);
  const observableOrNull = isValidObservable ? sourceObservable : null;
  return bD.simd(observableOrNull);
}

module.exports = getSimdFromObservableIfValid;