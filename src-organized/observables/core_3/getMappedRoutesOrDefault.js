/**
 * Returns the mapped routes from the provided source observable, or a default value if none is provided.
 *
 * @param {any} sourceObservable - The observable or data source to map to routes.
 * @returns {any} The mapped routes if sourceObservable is provided, otherwise a default route value.
 */
function getMappedRoutesOrDefault(sourceObservable) {
  // If a source observable is provided, map isBlobOrFileLikeObject to routes; otherwise, return the default value
  return sourceObservable ? createAnimationFrameObservable(sourceObservable) : createDebouncedFunction$9;
}

module.exports = getMappedRoutesOrDefault;