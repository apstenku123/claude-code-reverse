/**
 * Formats an observable source according to the provided configuration.
 *
 * If the configuration specifies formatting and includes an indentation string,
 * a newline character is added to the output. The function then delegates to serializeXmlNodes
 * to perform the actual formatting or processing.
 *
 * @param {any} sourceObservable - The observable or data source to be formatted.
 * @param {Object} config - Configuration object specifying formatting options.
 * @param {boolean} config.format - Whether to apply formatting.
 * @param {string} config.indentBy - String used for indentation (if any).
 * @returns {any} The result of formatting the observable using serializeXmlNodes.
 */
function formatObservableWithConfig(sourceObservable, config) {
  let newlineForFormatting = "";
  // If formatting is enabled and indentation is specified, add a newline
  if (config.format && config.indentBy.length > 0) {
    newlineForFormatting = "\n";
  }
  // Delegate to serializeXmlNodes with the appropriate parameters
  return serializeXmlNodes(sourceObservable, config, "", newlineForFormatting);
}

module.exports = formatObservableWithConfig;
