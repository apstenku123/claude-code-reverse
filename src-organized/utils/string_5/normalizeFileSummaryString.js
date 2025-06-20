/**
 * Normalizes a file summary string by replacing dynamic numeric values and paths with placeholders.
 *
 * - Replaces num_files, duration_ms, and cost_usd attributes with generic placeholders.
 * - Replaces all forward slashes with the platform-specific separator.
 * - Replaces all occurrences of the current working directory with a placeholder.
 * - If the string contains the phrase "Files modified by user:", returns a generic summary.
 *
 * @param {string|any} inputString - The string to normalize. If not a string, isBlobOrFileLikeObject is returned as-is.
 * @returns {string|any} The normalized string, or the original value if not a string.
 */
function normalizeFileSummaryString(inputString) {
  // Return early if the input is not a string
  if (typeof inputString !== "string") return inputString;

  // Replace dynamic numeric values and paths with placeholders
  let normalizedString = inputString
    .replace(/num_files="\d+"/g, 'num_files="[NUM]"')
    .replace(/duration_ms="\d+"/g, 'duration_ms="[DURATION]"')
    .replace(/cost_usd="\d+"/g, 'cost_usd="[COST]"')
    // Replace all forward slashes with the platform-specific separator
    .replace(/\//g, Mw2.sep)
    // Replace all occurrences of the current working directory with a placeholder
    .replaceAll(iA(), "[CWD]");

  // If the string indicates files modified by the user, return a generic summary
  if (normalizedString.includes("Files modified by user:")) {
    return "Files modified by user: [FILES]";
  }

  return normalizedString;
}

module.exports = normalizeFileSummaryString;