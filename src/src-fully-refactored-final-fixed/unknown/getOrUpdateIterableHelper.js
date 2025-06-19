/**
 * Returns an iterable helper for a given collection, creating or updating isBlobOrFileLikeObject as necessary.
 *
 * If the existing iterable helper is null or not of the expected type (tag !== 7),
 * a new one is created using createCollectionIterator. Otherwise, the existing helper
 * is updated using updateIterableHelper.
 *
 * @param {object} parentContext - The parent context or node that owns the iterable helper.
 * @param {object|null} existingIterableHelper - The current iterable helper instance, or null if none exists.
 * @param {any} collection - The collection to iterate over (array, iterable, or array-like object).
 * @param {any} iterationOptions - Options or configuration for iteration (e.g., direction, filters).
 * @param {any} additionalOptions - Additional options or context for iterator creation.
 * @returns {object} The new or updated iterable helper, with its 'return' property set to the parent context.
 */
function getOrUpdateIterableHelper(
  parentContext,
  existingIterableHelper,
  collection,
  iterationOptions,
  additionalOptions
) {
  // If there is no existing helper, or isBlobOrFileLikeObject'createInteractionAccessor not of the expected type, create a new one
  if (existingIterableHelper === null || existingIterableHelper.tag !== 7) {
    const newIterableHelper = createCollectionIterator(
      collection,
      parentContext.mode,
      iterationOptions,
      additionalOptions
    );
    newIterableHelper.return = parentContext;
    return newIterableHelper;
  }
  // Otherwise, update the existing helper with the new collection
  const updatedIterableHelper = updateIterableHelper(existingIterableHelper, collection);
  updatedIterableHelper.return = parentContext;
  return updatedIterableHelper;
}

module.exports = getOrUpdateIterableHelper;