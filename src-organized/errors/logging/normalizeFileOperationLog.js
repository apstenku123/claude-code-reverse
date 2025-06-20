/**
 * Normalizes file operation log strings by masking variable numeric values and replacing system-dependent paths.
 *
 * - Replaces numeric values for num_files, duration_ms, and cost_usd with placeholders.
 * - Replaces all path separators with the system-specific separator.
 * - Replaces all current working directory paths with a placeholder.
 * - If the log contains the phrase 'Files modified by user:', returns a generic message.
 *
 * @param {string|any} logEntry - The log entry to normalize. If not a string, returns the input as-is.
 * @returns {string|any} The normalized log entry, or the original input if not a string.
 */
function normalizeFileOperationLog(logEntry) {
  // Return non-string inputs unchanged
  if (typeof logEntry !== "string") return logEntry;

  // Replace numeric values with placeholders
  let normalizedLog = logEntry
    .replace(/num_files="\d+"/g, 'num_files="[NUM]"')
    .replace(/duration_ms="\d+"/g, 'duration_ms="[DURATION]"')
    .replace(/cost_usd="\d+"/g, 'cost_usd="[COST]"')
    // Replace all forward slashes with the system-specific separator
    .replace(/\//g, Mw2.sep)
    // Replace all current working directory paths with a placeholder
    .replaceAll(iA(), "[CWD]");

  // If the log indicates files were modified by the user, return a generic message
  if (normalizedLog.includes("Files modified by user:")) {
    return "Files modified by user: [FILES]";
  }

  return normalizedLog;
}

module.exports = normalizeFileOperationLog;