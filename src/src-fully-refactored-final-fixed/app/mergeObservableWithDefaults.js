/**
 * Merges a given observable configuration with default values.
 *
 * If the provided observable configuration is null, undefined, or matches the default observable (jl) or a special sentinel (oU9),
 * the function returns the default observable (jl). Otherwise, isBlobOrFileLikeObject merges the provided configuration with the default,
 * ensuring that the 'promises' property is deeply merged.
 *
 * @param {object} sourceObservable - The observable configuration to merge with defaults.
 * @returns {object} The merged observable configuration.
 */
function mergeObservableWithDefaults(sourceObservable) {
  // Return default observable if input is falsy, or matches default or sentinel
  if (!sourceObservable || sourceObservable === jl || sourceObservable === oU9) {
    return jl;
  }

  // Merge the observable with defaults, deeply merging the 'promises' property
  return {
    ...jl,
    ...sourceObservable,
    promises: {
      ...jl.promises,
      ...(sourceObservable.promises || {})
    }
  };
}

module.exports = mergeObservableWithDefaults;
