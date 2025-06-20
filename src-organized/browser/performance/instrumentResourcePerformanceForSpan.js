/**
 * Adds a performance instrumentation handler for resource entries that match the URL from the given span.
 * For each matching resource entry, sets attributes on the span as determined by extractNetworkProtocolMetrics.
 *
 * @param {Object} span - The span object to extract the URL from and set attributes on.
 * @returns {void}
 */
function instrumentResourcePerformanceForSpan(span) {
  // Extract the URL from the span'createInteractionAccessor JSON representation
  const spanData = nC.spanToJSON(span).data || {};
  const resourceUrl = spanData.url;

  // If the URL is not present or not a string, exit early
  if (!resourceUrl || typeof resourceUrl !== "string") return;

  /**
   * Handler function for performance instrumentation events of type 'resource'.
   * Iterates over performance entries and sets attributes on the span for matching entries.
   * @param {Object} event - The event object containing performance entries.
   * @param {Array} event.entries - Array of performance entries.
   */
  const resourceHandler = ({ entries }) => {
    entries.forEach(performanceEntry => {
      // Check if the entry is valid and its name ends with the resource URL
      if (isFetchOrXHRResourceEntry(performanceEntry) && performanceEntry.name.endsWith(resourceUrl)) {
        // For each attribute descriptor returned by extractNetworkProtocolMetrics, set the attribute on the span
        extractNetworkProtocolMetrics(performanceEntry).forEach(attributeArgs => {
          span.setAttribute(...attributeArgs);
        });
        // Re-schedule the handler for future entries
        setTimeout(resourceHandler);
      }
    });
  };

  // Register the handler for 'resource' performance instrumentation events
  r89.addPerformanceInstrumentationHandler("resource", resourceHandler);
}

module.exports = instrumentResourcePerformanceForSpan;