/**
 * Tracks the number of lines added and removed in a file change event.
 *
 * If the diffEntries array is empty and fileContent is provided, counts the total number of lines in fileContent as added.
 * Otherwise, counts lines added (starting with '+') and removed (starting with '-') from the diffEntries.
 * Updates UI and analytics with the counts.
 *
 * @param {Array<{ lines: string[] }>} diffEntries - Array of diff entry objects, each containing a 'lines' array.
 * @param {string} [fileContent] - Optional full file content as a string, used when diffEntries is empty.
 * @returns {void}
 */
function trackFileLineChanges(diffEntries, fileContent) {
  let linesAdded = 0;
  let linesRemoved = 0;

  if (diffEntries.length === 0 && fileContent) {
    // If no diff entries, count all lines in the file content as added
    linesAdded = fileContent.split(/\r?\n/).length;
  } else {
    // Count lines starting with '+' as added, '-' as removed
    linesAdded = diffEntries.reduce((total, entry) => {
      return total + entry.lines.filter(line => line.startsWith("+")).length;
    }, 0);
    linesRemoved = diffEntries.reduce((total, entry) => {
      return total + entry.lines.filter(line => line.startsWith("-")).length;
    }, 0);
  }

  // Update UI or internal state with the counts
  updateTotalLinesChanged(linesAdded, linesRemoved);

  // Optionally update analytics or tracking system with added/removed lines
  const be1Instance = BE1?.();
  be1Instance?.add(linesAdded, { type: "added" });
  be1Instance?.add(linesRemoved, { type: "removed" });

  // Emit an event for file change analytics
  logTelemetryEventIfEnabled("tengu_file_changed", {
    lines_added: linesAdded,
    lines_removed: linesRemoved
  });
}

module.exports = trackFileLineChanges;