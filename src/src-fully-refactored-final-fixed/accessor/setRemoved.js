/**
 * Updates the count of added and removed lines based on diff data, and triggers relevant events and metrics.
 *
 * @param {Array<Object>} diffEntries - Array of diff entry objects, each containing a 'lines' array.
 * @param {string} [rawDiffText] - Optional raw diff text (as a string), used if diffEntries is empty.
 * @returns {void}
 */
function setRemoved(diffEntries, rawDiffText) {
  let linesAdded = 0;
  let linesRemoved = 0;

  if (diffEntries.length === 0 && rawDiffText) {
    // If there are no diff entries but raw diff text is provided, count the number of lines
    linesAdded = rawDiffText.split(/\r?\n/).length;
  } else {
    // Count lines starting with '+' as added, '-' as removed
    linesAdded = diffEntries.reduce((total, entry) => {
      return total + entry.lines.filter(line => line.startsWith("+")).length;
    }, 0);
    linesRemoved = diffEntries.reduce((total, entry) => {
      return total + entry.lines.filter(line => line.startsWith("-")).length;
    }, 0);
  }

  // Update UI or metrics with the new counts
  updateTotalLinesChanged(linesAdded, linesRemoved);

  // Optionally update some external metric tracker if available
  const metricsTracker = BE1?.();
  if (metricsTracker) {
    metricsTracker.add(linesAdded, { type: "added" });
    metricsTracker.add(linesRemoved, { type: "removed" });
  }

  // Trigger a global event for file change with the line counts
  logTelemetryEventIfEnabled("tengu_file_changed", {
    lines_added: linesAdded,
    lines_removed: linesRemoved
  });
}

module.exports = setRemoved;