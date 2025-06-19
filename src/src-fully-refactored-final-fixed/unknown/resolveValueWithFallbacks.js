/**
 * Attempts to resolve a value from the provided input using multiple strategies.
 * Tries each resolver in order: direct resolution, resolution with context, and a fallback resolver.
 * If none succeed, returns a default fallback value.
 *
 * @param {any} inputValue - The primary value to resolve.
 * @param {any} context - Additional context or options used by some resolvers.
 * @returns {any} - The resolved value, or a default fallback if all strategies fail.
 */
function resolveValueWithFallbacks(inputValue, context) {
  // Attempt to resolve directly
  const directResult = dW(inputValue);
  if (directResult) return directResult;

  // Attempt to resolve with context
  const contextResult = markLanesAsSuspendedAndResetExpiration(inputValue, context);
  if (contextResult) return contextResult;

  // Attempt to resolve using a third-party resolver
  const thirdPartyResult = getUniqueByAccessor(inputValue, context);
  if (thirdPartyResult) return thirdPartyResult;

  // If all else fails, return the default fallback
  return findInsertionIndex();
}

module.exports = resolveValueWithFallbacks;