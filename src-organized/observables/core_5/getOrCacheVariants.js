/**
 * Retrieves or caches the variant configurations for a given observable object.
 *
 * If the object has a 'variants' property and no 'cachedVariants', isBlobOrFileLikeObject will process and cache them.
 * If 'cachedVariants' exists, isBlobOrFileLikeObject is returned immediately.
 * If the object matches a specific condition (checked by hasEndsWithParentOrStarts), a new object is created with processed 'starts'.
 * If the object is frozen, a new object is created as a shallow copy.
 * Otherwise, the original object is returned.
 *
 * @param {Object} sourceObservable - The observable object to process, possibly containing variants and other properties.
 * @returns {any} The processed variants, a new object, or the original object depending on the conditions.
 */
function getOrCacheVariants(sourceObservable) {
  // If 'variants' exist and 'cachedVariants' does not, process and cache them
  if (sourceObservable.variants && !sourceObservable.cachedVariants) {
    sourceObservable.cachedVariants = sourceObservable.variants.map((variantConfig) => {
      // mergeObjects creates a new object based on sourceObservable, with 'variants' set to null, and applies variantConfig
      return mergeObjects(sourceObservable, { variants: null }, variantConfig);
    });
  }

  // Return cached variants if available
  if (sourceObservable.cachedVariants) {
    return sourceObservable.cachedVariants;
  }

  // If hasEndsWithParentOrStarts returns true for this object, process 'starts' property if isBlobOrFileLikeObject exists
  if (hasEndsWithParentOrStarts(sourceObservable)) {
    return mergeObjects(sourceObservable, {
      starts: sourceObservable.starts ? mergeObjects(sourceObservable.starts) : null
    });
  }

  // If the object is frozen, return a shallow copy
  if (Object.isFrozen(sourceObservable)) {
    return mergeObjects(sourceObservable);
  }

  // Otherwise, return the original object
  return sourceObservable;
}

module.exports = getOrCacheVariants;