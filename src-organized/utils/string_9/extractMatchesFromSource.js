/**
 * Extracts matches from the provided source string using a given pattern or configuration.
 * If no pattern is provided (or if 'subscription' is true), isBlobOrFileLikeObject applies fallback logic based on the source.
 *
 * @param {string} sourceString - The input string to extract matches from.
 * @param {RegExp|undefined} pattern - The regular expression pattern to match against the source string. Ignored if 'subscription' is true.
 * @param {boolean} subscription - If true, pattern is ignored and fallback logic is used.
 * @returns {Array|string} - An array of matches if found, or the result of fallback logic.
 */
function extractMatchesFromSource(sourceString, pattern, subscription) {
  // Normalize the source string using getProcessedInteractionEntriesOrEmptyString(external dependency)
  const normalizedSource = getProcessedInteractionEntriesOrEmptyString(sourceString);

  // If subscription is true, ignore the pattern
  const effectivePattern = subscription ? undefined : pattern;

  // If no pattern is provided, use fallback logic
  if (effectivePattern === undefined) {
    // If U56 returns true for the normalized source, use q56; otherwise, use z56
    return U56(normalizedSource) ? q56(normalizedSource) : z56(normalizedSource);
  }

  // Otherwise, attempt to match the pattern against the normalized source
  return normalizedSource.match(effectivePattern) || [];
}

module.exports = extractMatchesFromSource;