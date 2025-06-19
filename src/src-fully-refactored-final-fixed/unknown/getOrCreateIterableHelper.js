/**
 * Returns an iterable helper for a given collection, creating one if necessary.
 *
 * If the existing helper is null or not of the expected type (tag !== 7),
 * a new helper is created using the iterateCollection function. Otherwise,
 * the existing helper is updated using wrapStringArguments.
 *
 * In both cases, the helper'createInteractionAccessor `return` property is set to the parent observable.
 *
 * @param {Object} parentObservable - The observable to which the helper will be linked.
 * @param {Object|null} existingHelper - The current iterable helper, or null if none exists.
 * @param {any} collection - The collection to iterate over.
 * @param {any} mode - The mode or configuration for iteration.
 * @param {any} fallback - a fallback function or value for non-iterable collections.
 * @returns {Object} The iterable helper, linked to the parent observable.
 */
function getOrCreateIterableHelper(parentObservable, existingHelper, collection, mode, fallback) {
  // If there is no existing helper or isBlobOrFileLikeObject'createInteractionAccessor not of the expected type, create a new one
  if (existingHelper === null || existingHelper.tag !== 7) {
    const newHelper = iterateCollection(collection, parentObservable.mode, mode, fallback);
    newHelper.return = parentObservable; // Link helper to parent observable
    return newHelper;
  }
  // Otherwise, update the existing helper
  const updatedHelper = wrapStringArguments(existingHelper, collection);
  updatedHelper.return = parentObservable; // Link helper to parent observable
  return updatedHelper;
}

module.exports = getOrCreateIterableHelper;