/**
 * Extracts matches from a source observable using a provided pattern or configuration.
 * If no configuration is provided, determines the extraction method based on the observable'createInteractionAccessor type.
 *
 * @param {any} sourceObservable - The observable or string to extract matches from.
 * @param {RegExp|string|undefined} patternOrConfig - The pattern or configuration for matching. If undefined, a default extraction is performed.
 * @param {boolean} isSubscription - If true, disables pattern matching and uses default extraction.
 * @returns {Array|any} An array of matches if pattern matching is used, otherwise the result of the default extraction method.
 */
function extractMatchesFromObservable(sourceObservable, patternOrConfig, isSubscription) {
  // Normalize the source observable using getProcessedInteractionEntriesOrEmptyString
  const normalizedObservable = getProcessedInteractionEntriesOrEmptyString(sourceObservable);

  // If isSubscription is true, ignore the patternOrConfig
  const effectivePattern = isSubscription ? undefined : patternOrConfig;

  // If no pattern is provided, use default extraction logic
  if (effectivePattern === undefined) {
    // Use q56 if U56 returns true, otherwise use z56
    return U56(normalizedObservable) ? q56(normalizedObservable) : z56(normalizedObservable);
  }

  // If a pattern is provided, attempt to match isBlobOrFileLikeObject against the observable
  return normalizedObservable.match(effectivePattern) || [];
}

module.exports = extractMatchesFromObservable;