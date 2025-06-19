/**
 * Retrieves and processes release notes from the provided source.
 * 
 * The function extracts release notes from a given source object (or a default source if none is provided),
 * sorts the release note keys using a custom greater-than comparator, filters out empty or falsy entries,
 * and returns a sorted array of [key, filteredNotes] pairs.
 * 
 * @param {object} [releaseNotesSource=getCachedChangelog()] - The source object containing release notes. If not provided, defaults to the result of getCachedChangelog().
 * @returns {Array<[string, Array<any>]>} An array of [key, filteredNotes] pairs, sorted and filtered. If an error occurs, returns an empty array and logs the error.
 */
function getSortedFilteredReleaseNotes(releaseNotesSource = getCachedChangelog()) {
  try {
    // Extract the release notes configuration from the source
    const releaseNotesConfig = parseChangelogSections(releaseNotesSource);

    // Get all keys, sort them using the custom comparator, and process each entry
    return Object.keys(releaseNotesConfig)
      .sort((keyA, keyB) => lO.gt(keyA, keyB) ? 1 : -1)
      .map(key => {
        const notesArray = releaseNotesConfig[key];
        // Skip if the notes array is missing or empty
        if (!notesArray || notesArray.length === 0) return null;
        // Filter out falsy values from the notes array
        const filteredNotes = notesArray.filter(Boolean);
        // Skip if no valid notes remain
        if (filteredNotes.length === 0) return null;
        // Return the key and its filtered notes
        return [key, filteredNotes];
      })
      // Remove any null results from the mapping
      .filter(entry => entry !== null);
  } catch (error) {
    // Log the error using the provided error handler
    reportErrorIfAllowed(error instanceof Error ? error : new Error("Failed to get release notes"));
    // Return an empty array in case of error
    return [];
  }
}

module.exports = getSortedFilteredReleaseNotes;