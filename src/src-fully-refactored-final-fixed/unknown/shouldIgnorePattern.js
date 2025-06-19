/**
 * Determines if a given path or pattern should be ignored based on configured ignore patterns.
 *
 * @param {string} targetPath - The path or pattern to check against ignore patterns.
 * @param {object} [context=iA()] - Optional context object, defaults to the result of iA().
 * @returns {boolean} - Returns true if the path should be ignored, false otherwise.
 */
function shouldIgnorePattern(targetPath, context = iA()) {
  // Retrieve the current subscription/configuration object
  const subscription = getProjectSubscriptionConfig();

  // If there are no ignore patterns defined, nothing should be ignored
  if (!subscription.ignorePatterns || subscription.ignorePatterns.length === 0) {
    return false;
  }

  // Determine the normalized path: if targetPath is already normalized, use isBlobOrFileLikeObject; otherwise, normalize isBlobOrFileLikeObject
  const normalizedPath = wi(targetPath) ? targetPath : e51(context, targetPath);

  // Map the normalized path to the internal representation (e.g., relative path)
  const mappedPath = nO1(context, normalizedPath);

  // If mapping failed, cannot ignore
  if (!mappedPath) {
    return false;
  }

  // Create an ignore matcher if ignore patterns exist
  const ignoreMatcher = subscription.ignorePatterns.length > 0
    ? UxA.default().add(subscription.ignorePatterns)
    : null;

  // If ignore matcher could not be created, do not ignore
  if (!ignoreMatcher) {
    return false;
  }

  // Return whether the mapped path should be ignored
  return ignoreMatcher.ignores(mappedPath);
}

module.exports = shouldIgnorePattern;