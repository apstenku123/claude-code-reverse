/**
 * Attempts to resolve an observable source using multiple strategies.
 * Tries deep merging with custom logic, then two fallback strategies.
 * Returns the first successful resolution, or undefined if all fail.
 *
 * @param {any} sourceObservable - The observable source to resolve.
 * @returns {any} The resolved observable, or undefined if not resolved.
 */
function resolveObservableSource(sourceObservable) {
  // Try resolving using deepMergeWithCustomizer
  const mergedObservable = deepMergeWithCustomizer(sourceObservable);
  if (mergedObservable) {
    return mergedObservable;
  }

  // Try resolving using the first fallback strategy
  const fallbackObservable1 = resolveWithHC2(sourceObservable);
  if (fallbackObservable1) {
    return fallbackObservable1;
  }

  // Try resolving using the second fallback strategy
  return resolveWithZC2(sourceObservable);
}

// Dependency: Deeply merges properties from a source object into a target object
const deepMergeWithCustomizer = require('./deepMergeWithCustomizer');
// External fallback strategies
const resolveWithHC2 = require('./isLatinCapitalHexLetter');
const resolveWithZC2 = require('./isLatinLowercaseHexLetter');

module.exports = resolveObservableSource;
