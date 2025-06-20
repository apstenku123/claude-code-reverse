/**
 * Parses a changelog string into an object mapping section titles to their entries.
 *
 * The changelog is expected to have sections starting with '## ', followed by lines beginning with '- '.
 * Each section title becomes a key in the returned object, and its value is an array of entry strings.
 *
 * @param {string} changelogText - The full changelog text to parse.
 * @returns {Object<string, string[]>} An object mapping section titles to arrays of entry strings.
 */
function parseChangelogSections(changelogText) {
  try {
    // Return empty object if input is falsy
    if (!changelogText) return {};

    const changelogSections = {};
    // Split the changelog into sections by lines starting with '## '
    const rawSections = changelogText.split(/^## /gm).slice(1); // Remove any content before the first section

    for (const sectionBlock of rawSections) {
      // Split section into lines and trim whitespace
      const sectionLines = sectionBlock.trim().split('\n');
      if (sectionLines.length === 0) continue;

      // The first line is the section title (may include a date, e.g., '1.0.0 - 2024-06-01')
      const sectionHeader = sectionLines[0];
      if (!sectionHeader) continue;

      // Extract the section name (before ' - ', if present)
      const sectionName = sectionHeader.split(' - ')[0]?.trim() || '';
      if (!sectionName) continue;

      // Find all lines that start with '- ', remove the dash, and trim
      const entryLines = sectionLines
        .slice(1) // Skip the header
        .filter(line => line.trim().startsWith('- '))
        .map(line => line.trim().substring(2).trim())
        .filter(Boolean); // Remove empty entries

      // Only add the section if isBlobOrFileLikeObject has at least one entry
      if (entryLines.length > 0) {
        changelogSections[sectionName] = entryLines;
      }
    }
    return changelogSections;
  } catch (error) {
    // If an error occurs, call reportErrorIfAllowed with the error and return an empty object
    reportErrorIfAllowed(error instanceof Error ? error : new Error('Failed to parse changelog'));
    return {};
  }
}

module.exports = parseChangelogSections;