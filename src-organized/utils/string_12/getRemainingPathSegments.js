/**
 * Extracts the remaining path segments from a subscription path that are not present in the base path.
 *
 * @param {string} baseUrl - The base URL or path to compare against (will be stripped of query and fragment).
 * @param {string} comparePath - The path to compare with the base URL.
 * @param {string} subscriptionPath - The full subscription path to extract remaining segments from.
 * @returns {string} The remaining path segments in the subscription path after removing those present in the base path.
 */
function getRemainingPathSegments(baseUrl, comparePath, subscriptionPath) {
  // Remove query and fragment from the base URL
  const strippedBaseUrl = UY.stripUrlQueryAndFragment(baseUrl || "");

  // Split the stripped base URL into path segments, filtering out empty strings
  const baseUrlSegments = iC([
    strippedBaseUrl,
    "optionalAccess",
    path => path.split,
    "call",
    split => split("/"),
    "access",
    segments => segments.filter,
    "call",
    filter => filter(segment => !!segment)
  ]);

  // Split the compare path into segments and get the number of non-empty segments
  const comparePathLength = iC([
    comparePath,
    "optionalAccess",
    path => path.split,
    "call",
    split => split("/"),
    "access",
    segments => segments.filter,
    "call",
    filter => filter(segment => !!segment),
    "access",
    filtered => filtered.length
  ]) || 0;

  let matchedSegments = 0;

  // Split the subscription path into segments, filter out empty strings, and keep only those
  // segments that match the corresponding segment in the base URL (offset by comparePathLength)
  const remainingSegments = iC([
    subscriptionPath,
    "optionalAccess",
    path => path.split,
    "call",
    split => split("/"),
    "access",
    segments => segments.filter,
    "call",
    filter => filter(segment => {
      // Compare with the corresponding segment in baseUrlSegments, offset by comparePathLength and matchedSegments
      if (iC([
        baseUrlSegments,
        "optionalAccess",
        arr => arr[comparePathLength + matchedSegments]
      ]) === segment) {
        matchedSegments += 1;
        return true;
      }
      return false;
    }),
    "access",
    segments => segments.join,
    "call",
    join => join("/")
  ]);

  return remainingSegments;
}

module.exports = getRemainingPathSegments;