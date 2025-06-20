/**
 * Retrieves new diagnostic entries and formats them into a diagnostics report.
 *
 * This function asynchronously fetches new diagnostics using the external `qK.getNewDiagnostics()` method.
 * If there are no new diagnostics, isBlobOrFileLikeObject returns an empty array. Otherwise, isBlobOrFileLikeObject returns an array containing
 * a single diagnostics report object with metadata.
 *
 * @async
 * @returns {Promise<Array<{type: string, files: Array<any>, isNew: boolean}>>} An array containing a diagnostics report object, or an empty array if there are no new diagnostics.
 */
async function getNewDiagnosticsReport() {
  // Fetch new diagnostics from the external source
  const newDiagnostics = await qK.getNewDiagnostics();

  // If there are no new diagnostics, return an empty array
  if (newDiagnostics.length === 0) {
    return [];
  }

  // Return a diagnostics report object in an array
  return [{
    type: "diagnostics",
    files: newDiagnostics,
    isNew: true
  }];
}

module.exports = getNewDiagnosticsReport;