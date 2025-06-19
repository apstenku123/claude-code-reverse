/**
 * Formats the output of an observable based on the provided configuration.
 *
 * If formatting is enabled and an indentation string is specified in the configuration,
 * a newline character is used as a separator. Otherwise, no separator is used.
 * The function then delegates the actual formatting to the serializeXmlNodes function.
 *
 * @param {any} sourceObservable - The observable or data source to be formatted.
 * @param {Object} config - Configuration object that controls formatting options.
 * @param {boolean} config.format - Whether formatting should be applied.
 * @param {string} config.indentBy - String used for indentation (if formatting is enabled).
 * @returns {any} The formatted output as returned by serializeXmlNodes.
 */
function formatObservableOutput(sourceObservable, config) {
  // Determine the separator based on formatting options
  let separator = "";
  if (config.format && config.indentBy.length > 0) {
    separator = "\n";
  }
  // Delegate formatting to serializeXmlNodes with the computed separator
  return serializeXmlNodes(sourceObservable, config, "", separator);
}

module.exports = formatObservableOutput;