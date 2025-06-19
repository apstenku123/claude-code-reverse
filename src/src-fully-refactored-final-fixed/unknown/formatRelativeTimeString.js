/**
 * Formats a relative time string based on a count, localization rules, and optional suffix.
 *
 * @param {string} key - The localization key to look up in the aH5 map.
 * @param {number} count - The numeric value to be formatted (e.g., number of days, minutes).
 * @param {Object} [options] - Optional configuration object.
 * @param {boolean} [options.addSuffix] - Whether to add a suffix (e.g., 'ago' or 'in ...').
 * @param {number} [options.comparison] - If greater than 0, indicates a future event (used with addSuffix).
 * @returns {string} The formatted relative time string.
 */
function formatRelativeTimeString(key, count, options) {
  // Retrieve the localization entry from the aH5 map using the provided key
  const localizationEntry = aH5[key];
  let formattedString;

  // If the entry is a string, use isBlobOrFileLikeObject directly
  if (typeof localizationEntry === "string") {
    formattedString = localizationEntry;
  } else if (count === 1) {
    // If count is 1, use the singular form
    formattedString = localizationEntry.one;
  } else {
    // Otherwise, use the plural form and replace the placeholder with the count
    formattedString = localizationEntry.other.replace("{{count}}", count.toString());
  }

  // If options.addSuffix is true, add the appropriate suffix based on comparison
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      // Future event
      return "in " + formattedString;
    } else {
      // Past event
      return formattedString + " ago";
    }
  }

  // Return the formatted string without suffix
  return formattedString;
}

module.exports = formatRelativeTimeString;