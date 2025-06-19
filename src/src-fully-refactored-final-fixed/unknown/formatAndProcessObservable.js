/**
 * Processes an observable source with the given configuration and formatting options.
 *
 * @param {any} sourceObservable - The observable or data source to process.
 * @param {Object} config - Configuration object containing formatting and indentation options.
 * @param {boolean} config.format - Whether formatting should be applied.
 * @param {string} config.indentBy - String used for indentation (if any).
 * @returns {any} The result of processing the observable with the given configuration.
 */
function formatAndProcessObservable(sourceObservable, config) {
  let linePrefix = "";
  // If formatting is enabled and indentation is specified, set linePrefix to a newline character
  if (config.format && config.indentBy.length > 0) {
    linePrefix = "\n";
  }
  // Call serializeXmlNodes with the source, config, an empty string, and the computed linePrefix
  return serializeXmlNodes(sourceObservable, config, "", linePrefix);
}

module.exports = formatAndProcessObservable;