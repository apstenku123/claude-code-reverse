/**
 * Attaches a performance instrumentation handler for resource entries matching a specific URL.
 * For each matching resource entry, applies attributes to the source element using extractNetworkProtocolMetrics and schedules the handler again.
 *
 * @param {Object} sourceObservable - The observable or DOM element to which attributes will be set.
 * @returns {void}
 */
function attachResourcePerformanceHandler(sourceObservable) {
  // Extract the URL from the observable'createInteractionAccessor span data
  const { url: resourceUrl } = nC.spanToJSON(sourceObservable).data || {};

  // If no valid URL is found, exit early
  if (!resourceUrl || typeof resourceUrl !== "string") return;

  // Register a performance instrumentation handler for 'resource' entries
  const subscription = r89.addPerformanceInstrumentationHandler("resource", ({ entries: resourceEntries }) => {
    resourceEntries.forEach(resourceEntry => {
      // Check if the entry is valid and its name ends with the target URL
      if (isFetchOrXHRResourceEntry(resourceEntry) && resourceEntry.name.endsWith(resourceUrl)) {
        // For each attribute tuple returned by extractNetworkProtocolMetrics, set the attribute on the source element
        extractNetworkProtocolMetrics(resourceEntry).forEach(attributeTuple => {
          sourceObservable.setAttribute(...attributeTuple);
        });
        // Schedule the handler again asynchronously
        setTimeout(subscription);
      }
    });
  });
}

module.exports = attachResourcePerformanceHandler;