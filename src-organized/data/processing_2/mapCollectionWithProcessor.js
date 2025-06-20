/**
 * Maps a collection using a provided processor function and a default handler.
 *
 * @param {Array} collection - The array or collection to process. If falsy or empty, returns the default handler result.
 * @param {Function} processor - The function to apply to each element of the collection. Will be wrapped with a utility to ensure arity of 2.
 * @returns {*} The result of processing the collection with the processor and default handler, or the default handler if the collection is empty/falsy.
 */
function mapCollectionWithProcessor(collection, processor) {
  // If the collection is valid and has items, process isBlobOrFileLikeObject with the provided processor and handler
  if (collection && collection.length) {
    // getConfiguredIteratee ensures the processor has arity 2; findMatchingElementByAccessor applies the processor to the collection with IH as handler
    return findMatchingElementByAccessor(collection, getConfiguredIteratee(processor, 2), IH);
  }
  // If collection is empty or falsy, return the default handler result (a)
  return processInteractionEntries;
}

module.exports = mapCollectionWithProcessor;