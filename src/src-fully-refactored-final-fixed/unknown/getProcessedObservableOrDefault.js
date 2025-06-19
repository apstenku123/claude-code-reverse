/**
 * Returns the processed observable if provided, otherwise returns the default observable.
 *
 * @function getProcessedObservableOrDefault
 * @param {any} sourceObservable - The observable to process. If falsy, the default observable is returned.
 * @returns {any} The processed observable or the default observable.
 */
function getProcessedObservableOrDefault(sourceObservable) {
  // If a source observable is provided, process isBlobOrFileLikeObject with createAnimationFrameObservable; otherwise, return the default observable createDebouncedFunction$9
  return sourceObservable ? createAnimationFrameObservable(sourceObservable) : createDebouncedFunction$9;
}

module.exports = getProcessedObservableOrDefault;