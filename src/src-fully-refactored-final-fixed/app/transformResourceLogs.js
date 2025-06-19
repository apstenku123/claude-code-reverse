/**
 * Transforms a collection of resource log entries into a structured array of resource log objects.
 *
 * @param {Iterable} resourceLogEntries - An iterable (such as a Map) where each entry contains a resource key and associated scope logs.
 * @param {any} transformConfig - Configuration or context passed to the log record transformation function.
 * @returns {Array<Object>} An array of resource log objects, each containing resource, scopeLogs, and schemaUrl fields.
 */
function transformResourceLogs(resourceLogEntries, transformConfig) {
  // groupEntriesByResourceAndScope processes the input resourceLogEntries into an iterable structure
  const resourceLogIterable = groupEntriesByResourceAndScope(resourceLogEntries);

  // Map each resource entry to a structured resource log object
  return Array.from(resourceLogIterable, ([resourceKey, scopeLogsMap]) => ({
    // Create a resource object from the resource key
    resource: aG1.createResource(resourceKey),

    // Transform each scope log entry
    scopeLogs: Array.from(scopeLogsMap, ([, logRecordsArray]) => {
      // Each logRecordsArray contains log records for a particular instrumentation scope
      return {
        // Create an instrumentation scope object
        scope: aG1.createInstrumentationScope(logRecordsArray[0].instrumentationScope),
        // Transform each log record using formatLogRecordForExport and the provided config
        logRecords: logRecordsArray.map(logRecord => formatLogRecordForExport(logRecord, transformConfig)),
        // Extract the schema URL from the instrumentation scope
        schemaUrl: logRecordsArray[0].instrumentationScope.schemaUrl
      };
    }),

    // The schemaUrl for the resource log object is set to undefined (could be extended in the future)
    schemaUrl: undefined
  }));
}

module.exports = transformResourceLogs;