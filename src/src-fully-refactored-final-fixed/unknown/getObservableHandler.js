/**
 * Attempts to retrieve an observable handler for the given source.
 * Tries multiple strategies in order: deepMergeWithCustomizer, getCustomObservableHandler, or getDefaultObservableHandler.
 *
 * @param {any} sourceObservable - The source object or value to retrieve an observable handler for.
 * @returns {any} The observable handler if found, otherwise undefined.
 */
function getObservableHandler(sourceObservable) {
  // Try to get a handler using deepMergeWithCustomizer
  const handlerFromDeepMerge = deepMergeWithCustomizer(sourceObservable);
  if (handlerFromDeepMerge) {
    return handlerFromDeepMerge;
  }

  // Try to get a handler using a custom observable handler
  const handlerFromCustom = getCustomObservableHandler(sourceObservable);
  if (handlerFromCustom) {
    return handlerFromCustom;
  }

  // Fallback to getting a default observable handler
  return getDefaultObservableHandler(sourceObservable);
}

module.exports = getObservableHandler;