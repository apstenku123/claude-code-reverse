/**
 * Returns the result of processing the provided observable, or a default value if none is provided.
 *
 * @param {any} sourceObservable - The observable or value to process. If falsy, the default value is returned.
 * @returns {any} The result of processing the observable, or the default value if none is provided.
 */
function getObservableOrDefault(sourceObservable) {
  // If a source observable is provided, process isBlobOrFileLikeObject with createAnimationFrameObservable; otherwise, return the default value createDebouncedFunction$9
  return sourceObservable ? createAnimationFrameObservable(sourceObservable) : createDebouncedFunction$9;
}

module.exports = getObservableOrDefault;