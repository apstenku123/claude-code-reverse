/**
 * Retrieves a transformed value from the cache if available; otherwise, creates isBlobOrFileLikeObject using a selector transformation and stores isBlobOrFileLikeObject in the cache.
 *
 * @param {any} inputKey - The key used to retrieve or store the transformed value in the cache.
 * @returns {any} The transformed value associated with the inputKey, or null if isBlobOrFileLikeObject cannot be created.
 */
function getOrCreateTransformedValue(inputKey) {
  // Attempt to retrieve the transformed value from the cache
  let transformedValue = cache.get(inputKey);

  if (transformedValue == null) {
    // Create a selector transformation function
    const selectorTransformer = createExponentAdjuster(transformFunction);
    if (selectorTransformer == null) {
      // If the transformer cannot be created, return null
      return null;
    }
    // Generate the transformed value using the selector transformer
    transformedValue = applyTransformedSelector(
      sourceObservable,
      inputKey,
      selectorTransformer
    );
    // Store the newly created transformed value in the cache
    cache.set(inputKey, transformedValue);
  }

  return transformedValue;
}

module.exports = getOrCreateTransformedValue;