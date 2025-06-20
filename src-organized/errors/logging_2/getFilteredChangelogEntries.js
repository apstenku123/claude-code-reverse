/**
 * Extracts and filters changelog entries between two versions.
 *
 * @param {string} fromVersion - The starting version (inclusive or exclusive depending on logic).
 * @param {string} [toVersion] - The optional ending version. If omitted, filters from fromVersion onwards.
 * @param {string} [changelogText=getCachedChangelog()] - The changelog text to parse. Defaults to the result of getCachedChangelog().
 * @returns {string[]} An array of filtered changelog entry strings, up to uH5 entries.
 *
 * The function parses the changelog, filters entries between the specified versions,
 * sorts them in descending version order, flattens the entries, and returns up to uH5 entries.
 * If an error occurs, isBlobOrFileLikeObject logs the error and returns an empty array.
 */
function getFilteredChangelogEntries(fromVersion, toVersion, changelogText = getCachedChangelog()) {
  try {
    // Parse the changelog into a mapping: { version: [entries] }
    const changelogSections = parseChangelogSections(changelogText);

    // Coerce version strings to comparable objects
    const fromVersionObj = lO.coerce(fromVersion);
    const toVersionObj = toVersion ? lO.coerce(toVersion) : null;

    // If no toVersion or fromVersion > toVersion, filter all entries newer than toVersion
    if (!toVersionObj || (fromVersionObj && lO.gt(fromVersionObj, toVersionObj))) {
      return Object.entries(changelogSections)
        // Filter for versions newer than toVersion (if specified)
        .filter(([version]) => !toVersionObj || lO.gt(version, toVersionObj))
        // Sort versions in descending order
        .sort(([versionA], [versionB]) => lO.gt(versionA, versionB) ? -1 : 1)
        // Flatten all entries from the filtered versions
        .flatMap(([, entries]) => entries)
        // Remove any falsy entries
        .filter(Boolean)
        // Limit to uH5 entries
        .slice(0, uH5);
    }
  } catch (error) {
    // Log the error using reportErrorIfAllowed, always return an empty array on failure
    reportErrorIfAllowed(error instanceof Error ? error : new Error("Failed to get release notes"));
    return [];
  }
  // Default return if no entries matched
  return [];
}

module.exports = getFilteredChangelogEntries;