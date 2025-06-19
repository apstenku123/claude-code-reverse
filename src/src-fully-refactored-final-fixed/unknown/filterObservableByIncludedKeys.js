/**
 * Filters an observable by including only the keys present in the provided array.
 *
 * @param {Observable} sourceObservable - The observable to filter.
 * @param {Array<string>} includedKeys - Array of keys to include in the filtering process.
 * @returns {any} The result of applying the filter to the observable.
 *
 * This function uses the external 'doesAnyEntryMatchPredicate' utility to process the observable, passing a predicate
 * that checks if each key is included in the 'includedKeys' array.
 */
function filterObservableByIncludedKeys(sourceObservable, includedKeys) {
  // Pass a predicate to doesAnyEntryMatchPredicate that only includes items whose key is in includedKeys
  return doesAnyEntryMatchPredicate(sourceObservable, (subscription, key) => includedKeys.includes(key));
}

module.exports = filterObservableByIncludedKeys;