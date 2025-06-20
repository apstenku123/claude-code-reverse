/**
 * Parses a changelog string, extracts its sections, sorts them, and returns non-empty entries for each section.
 *
 * @param {string} changelogText - The raw changelog string to parse. If not provided, defaults to the result of getCachedChangelog().
 * @returns {Array<[string, string[]]>} An array of [sectionTitle, entries] pairs, sorted by section title, with only non-empty entries included.
 */
function getSortedChangelogSections(changelogText = getCachedChangelog()) {
  try {
    // Parse the changelog into an object: { sectionTitle: [entry, ...], ... }
    const sectionsMap = parseChangelogSections(changelogText);

    // Sort section titles and map to [sectionTitle, entries] pairs, filtering out empty or falsy entries
    return Object.keys(sectionsMap)
      .sort((sectionA, sectionB) => lO.gt(sectionA, sectionB) ? 1 : -1)
      .map(sectionTitle => {
        const entries = sectionsMap[sectionTitle];
        // Skip if no entries or empty array
        if (!entries || entries.length === 0) return null;
        // Remove falsy entries (e.g., empty strings)
        const filteredEntries = entries.filter(Boolean);
        if (filteredEntries.length === 0) return null;
        return [sectionTitle, filteredEntries];
      })
      // Remove nulls (sections with no valid entries)
      .filter(section => section !== null);
  } catch (error) {
    // Handle errors gracefully and log them using reportErrorIfAllowed
    reportErrorIfAllowed(error instanceof Error ? error : new Error("Failed to get release notes"));
    return [];
  }
}

module.exports = getSortedChangelogSections;