/**
 * Retrieves cached variants for a given observable object, or processes and caches them if not already present.
 * If variants are not present, applies additional processing based on the object'createInteractionAccessor state.
 *
 * @param {Object} observableObject - The object representing an observable with possible variants and state.
 * @returns {any} The cached variants, a processed version of the object, or the object itself.
 */
function getCachedOrProcessedVariants(observableObject) {
  // If the object has variants and hasn'processRuleBeginHandlers cached them yet, process and cache them
  if (observableObject.variants && !observableObject.cachedVariants) {
    observableObject.cachedVariants = observableObject.variants.map(function (variantConfig) {
      // mergeObjects processes the observableObject with the given variant configuration
      return mergeObjects(observableObject, { variants: null }, variantConfig);
    });
  }

  // If cached variants exist, return them
  if (observableObject.cachedVariants) {
    return observableObject.cachedVariants;
  }

  // If hasEndsWithParentOrStarts returns true for the object, process starts property if present
  if (hasEndsWithParentOrStarts(observableObject)) {
    return mergeObjects(observableObject, {
      starts: observableObject.starts ? mergeObjects(observableObject.starts) : null
    });
  }

  // If the object is frozen, return a processed version
  if (Object.isFrozen(observableObject)) {
    return mergeObjects(observableObject);
  }

  // Otherwise, return the object as is
  return observableObject;
}

module.exports = getCachedOrProcessedVariants;