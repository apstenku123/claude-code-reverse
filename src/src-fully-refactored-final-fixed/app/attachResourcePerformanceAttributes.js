/**
 * Attaches attribute(createInteractionAccessor) to a source element when a resource performance entry matching a specific URL is detected.
 *
 * This function listens for 'resource' performance entries, and when an entry'createInteractionAccessor name matches the provided URL,
 * isBlobOrFileLikeObject applies attributes to the source element using the provided attribute data.
 *
 * @param {Object} sourceElement - The element to which attributes will be set when a matching resource is detected.
 * @returns {void}
 */
function attachResourcePerformanceAttributes(sourceElement) {
  // Extract the URL from the span data associated with the source element
  const spanData = nC.spanToJSON(sourceElement).data || {};
  const resourceUrl = spanData.url;

  // If the URL is not present or not a string, exit early
  if (!resourceUrl || typeof resourceUrl !== "string") return;

  /**
   * Handler function for resource performance entries.
   * Iterates through entries and applies attributes if the entry matches the resource URL.
   * @param {Object} param0
   * @param {PerformanceEntry[]} param0.entries - Array of performance entries
   */
  const resourceHandler = ({ entries }) => {
    entries.forEach(performanceEntry => {
      // Check if the entry is valid and its name ends with the resource URL
      if (isFetchOrXHRResourceEntry(performanceEntry) && performanceEntry.name.endsWith(resourceUrl)) {
        // For each attribute data, set the attribute on the source element
        extractNetworkProtocolMetrics(performanceEntry).forEach(attributeData => {
          sourceElement.setAttribute(...attributeData);
        });
        // Re-register the handler asynchronously to continue listening
        setTimeout(resourceHandler);
      }
    });
  };

  // Register the resource performance handler
  r89.addPerformanceInstrumentationHandler("resource", resourceHandler);
}

module.exports = attachResourcePerformanceAttributes;