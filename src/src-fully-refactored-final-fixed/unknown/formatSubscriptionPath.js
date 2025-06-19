/**
 * Formats a subscription path string from the given observable source.
 *
 * @param {any} sourceObservable - The observable or input to extract the subscription path from.
 * @returns {string} The formatted subscription path, or '.' if both parts are missing.
 */
function formatSubscriptionPath(sourceObservable) {
  // extractRegexGroupsFromPossiblyTruncatedString is assumed to extract an array with [subscription, path]
  const [subscription, path] = extractRegexGroupsFromPossiblyTruncatedString(sourceObservable);

  // If both subscription and path are falsy, return '.'
  if (!subscription && !path) {
    return ".";
  }

  let formattedPath = path;

  // If path exists, remove its last character
  if (formattedPath) {
    formattedPath = formattedPath.slice(0, formattedPath.length - 1);
  }

  // Concatenate subscription and formattedPath (may be undefined or empty)
  return subscription + (formattedPath || "");
}

module.exports = formatSubscriptionPath;