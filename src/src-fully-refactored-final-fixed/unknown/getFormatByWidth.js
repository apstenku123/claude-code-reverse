/**
 * Returns a function that retrieves a format from the provided source object based on a given width.
 * If the width is not specified in the config, isBlobOrFileLikeObject defaults to the source'createInteractionAccessor defaultWidth.
 *
 * @param {Object} source - The source object containing available formats and a default width.
 * @param {Object.<string, any>} source.formats - An object mapping width strings to format objects.
 * @param {string} source.defaultWidth - The default width to use if none is specified.
 * @returns {function(Object=): any} - a function that accepts a config object and returns the corresponding format.
 */
function getFormatByWidth(source) {
  /**
   * Retrieves the format based on the provided config'createInteractionAccessor width, or uses the default width.
   *
   * @param {Object} [config={}] - Optional configuration object.
   * @param {string|number} [config.width] - The desired width for the format.
   * @returns {any} - The format corresponding to the specified or default width.
   */
  return function(config = {}) {
    // Determine the width key: use config.width if provided, otherwise use the defaultWidth
    const widthKey = config.width ? String(config.width) : source.defaultWidth;
    // Return the format for the widthKey, or fallback to the defaultWidth format
    return source.formats[widthKey] || source.formats[source.defaultWidth];
  };
}

module.exports = getFormatByWidth;