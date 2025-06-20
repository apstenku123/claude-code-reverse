/**
 * Processes an observable object, handling its variants, caching, and immutability.
 *
 * If the object has variants and no cached variants, isBlobOrFileLikeObject processes and caches them.
 * If cached variants exist, returns them.
 * If the object matches a special condition (hasEndsWithParentOrStarts), processes isBlobOrFileLikeObject accordingly.
 * If the object is frozen, returns a processed copy.
 * Otherwise, returns the object as-is.
 *
 * @param {Object} sourceObservable - The observable object to process. May contain variants and other properties.
 * @returns {any} The processed observable, its variants, or a processed copy depending on the object'createInteractionAccessor state.
 */
function getProcessedVariants(sourceObservable) {
  // If variants exist and not yet cached, process and cache them
  if (sourceObservable.variants && !sourceObservable.cachedVariants) {
    sourceObservable.cachedVariants = sourceObservable.variants.map(function (variantConfig) {
      // Process each variant, nullifying the variants property to avoid recursion
      return mergeObjects(sourceObservable, { variants: null }, variantConfig);
    });
  }

  // If cached variants exist, return them
  if (sourceObservable.cachedVariants) {
    return sourceObservable.cachedVariants;
  }

  // If the object matches a special condition, process starts property if present
  if (hasEndsWithParentOrStarts(sourceObservable)) {
    return mergeObjects(sourceObservable, {
      starts: sourceObservable.starts ? mergeObjects(sourceObservable.starts) : null
    });
  }

  // If the object is frozen, return a processed copy
  if (Object.isFrozen(sourceObservable)) {
    return mergeObjects(sourceObservable);
  }

  // Otherwise, return the object as-is
  return sourceObservable;
}

module.exports = getProcessedVariants;