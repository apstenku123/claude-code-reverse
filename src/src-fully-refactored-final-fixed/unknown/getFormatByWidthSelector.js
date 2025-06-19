/**
 * Returns a function that selects a format from the provided format source based on a given width.
 *
 * @param {Object} formatSource - The source object containing available formats and default width.
 * @param {Object.<string, any>} formatSource.formats - An object mapping width strings to format objects.
 * @param {string} formatSource.defaultWidth - The default width to use if none is specified.
 * @returns {function(Object=): any} a function that takes an optional config object and returns the appropriate format.
 */
function getFormatByWidthSelector(formatSource) {
  /**
   * Selects a format based on the provided config'createInteractionAccessor width, or falls back to the default width.
   *
   * @param {Object} [config={}] - Optional configuration object.
   * @param {string|number} [config.width] - The desired width for selecting the format.
   * @returns {any} The format corresponding to the specified or default width.
   */
  return function selectFormatByWidth(config = {}) {
    // Determine the width to use: prefer config.width if provided, otherwise use the default
    const widthKey = config.width ? String(config.width) : formatSource.defaultWidth;
    // Return the format for the determined width, or fallback to the default width format
    return formatSource.formats[widthKey] || formatSource.formats[formatSource.defaultWidth];
  };
}

module.exports = getFormatByWidthSelector;