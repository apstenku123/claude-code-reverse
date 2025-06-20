/**
 * Exports data from a source observable with tracing suppressed in the current context.
 *
 * @param {Object} sourceObservable - The observable or exporter object with an export method.
 * @param {Object} exportConfig - Configuration or parameters to pass to the export method.
 * @returns {Promise<any>} Resolves with the result of the export operation.
 */
function exportWithSuppressedTracing(sourceObservable, exportConfig) {
  return new Promise((resolve) => {
    // Suppress tracing in the current context before performing the export
    const suppressedContext = Zo4.suppressTracing(CU0.context.active());
    CU0.context.with(suppressedContext, () => {
      // Call the export method on the source observable with the provided config
      // Resolve the promise with the result once export completes
      sourceObservable.export(exportConfig, (exportResult) => {
        resolve(exportResult);
      });
    });
  });
}

module.exports = exportWithSuppressedTracing;