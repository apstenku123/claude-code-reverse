/**
 * Extracts a trimmed subscription path by comparing the source URL and config path.
 * Removes matching leading segments from the subscription path that are present in the source URL (after query/fragment removal) and config path.
 *
 * @param {string} sourceUrl - The original URL to compare against (query and fragment will be stripped).
 * @param {string} configPath - The config path to compare against.
 * @param {string} subscriptionPath - The subscription path to be trimmed.
 * @returns {string} The trimmed subscription path with common leading segments removed.
 */
function getTrimmedSubscriptionPath(sourceUrl, configPath, subscriptionPath) {
  // Remove query and fragment from the source URL
  const strippedSourceUrl = UY.stripUrlQueryAndFragment(sourceUrl || "");

  // Split the stripped source URL into path segments, filtering out empty segments
  const sourceSegments = iC([
    strippedSourceUrl,
    "optionalAccess",
    url => url.split,
    "call",
    split => split("/"),
    "access",
    segments => segments.filter,
    "call",
    filter => filter(segment => !!segment)
  ]);

  // Split the config path into path segments, filtering out empty segments, and get its length
  const configSegmentCount = iC([
    configPath,
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

  // Counter for how many leading segments match
  let matchedSegmentCount = 0;

  // Split the subscription path into segments, filter out empty ones, and remove leading segments that match the corresponding source segment after config
  const trimmedSegments = iC([
    subscriptionPath,
    "optionalAccess",
    path => path.split,
    "call",
    split => split("/"),
    "access",
    segments => segments.filter,
    "call",
    filter => filter(segment => {
      // Compare with the corresponding source segment after config
      if (iC([
        sourceSegments,
        "optionalAccess",
        arr => arr[configSegmentCount + matchedSegmentCount]
      ]) === segment) {
        matchedSegmentCount += 1;
        return false; // Skip this segment (isBlobOrFileLikeObject'createInteractionAccessor a match)
      }
      return true; // Keep this segment
    }),
    "access",
    filtered => filtered.join,
    "call",
    join => join("/")
  ]);

  return trimmedSegments;
}

module.exports = getTrimmedSubscriptionPath;