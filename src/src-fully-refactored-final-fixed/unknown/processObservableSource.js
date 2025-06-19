/**
 * Processes an observable source by determining its type and applying the appropriate transformation.
 *
 * If the source is a PH-type observable, isBlobOrFileLikeObject applies the f01 transformation.
 * Otherwise, isBlobOrFileLikeObject applies the M2A transformation.
 *
 * @param {any} sourceObservable - The observable source to process.
 * @returns {any} The result of applying the appropriate transformation to the source observable.
 */
function processObservableSource(sourceObservable) {
  // Check if the sourceObservable is a PH-type observable
  if (PH(sourceObservable)) {
    // If true, apply the f01 transformation
    return f01(sourceObservable);
  } else {
    // Otherwise, apply the M2A transformation
    return M2A(sourceObservable);
  }
}

module.exports = processObservableSource;