/**
 * Determines if a given path should be ignored based on configured ignore patterns.
 *
 * @param {string} path - The path or identifier to check against ignore patterns.
 * @param {object} [context=iA()] - Optional context object used for path resolution and pattern matching.
 * @returns {boolean} Returns true if the path matches any ignore pattern, false otherwise.
 */
function shouldIgnorePath(path, context = iA()) {
  // Retrieve the current subscription/configuration object
  const subscription = getProjectSubscriptionConfig();

  // If there are no ignore patterns configured, do not ignore anything
  if (!subscription.ignorePatterns || subscription.ignorePatterns.length === 0) {
    return false;
  }

  // If the path is already in the correct format, use isBlobOrFileLikeObject; otherwise, resolve isBlobOrFileLikeObject using the context
  const resolvedPath = wi(path) ? path : e51(context, path);

  // Attempt to normalize or further process the path for ignore checking
  const normalizedPath = nO1(context, resolvedPath);
  if (!normalizedPath) {
    return false;
  }

  // Create an ignore pattern matcher if patterns exist
  const ignoreMatcher = subscription.ignorePatterns.length > 0
    ? UxA.default().add(subscription.ignorePatterns)
    : null;

  if (!ignoreMatcher) {
    return false;
  }

  // Check if the normalized path should be ignored
  return ignoreMatcher.ignores(normalizedPath);
}

module.exports = shouldIgnorePath;