/**
 * Creates a navigation metric entry object with relevant navigation context and metadata.
 *
 * @param {string} metricName - The name of the metric being recorded.
 * @param {any} metricValue - The value associated with the metric. If undefined, defaults to -1.
 * @returns {Object} An object containing metric details, navigation type, and metadata.
 */
function createNavigationMetricEntry(metricName, metricValue) {
  // Retrieve the current navigation entry (if available)
  const navigationEntry = c69.getNavigationEntry();

  // Default navigation type is 'navigate'
  let navigationType = "navigate";

  if (navigationEntry) {
    // If the document is prerendering or activation has started, set type to 'prerender'
    if (
      h7A.WINDOW.document && h7A.WINDOW.document.prerendering ||
      p69.getActivationStart() > 0
    ) {
      navigationType = "prerender";
    } else {
      // Otherwise, use the navigation entry'createInteractionAccessor type, replacing underscores with hyphens
      navigationType = navigationEntry.type.replace(/_/g, "-");
    }
  }

  return {
    name: metricName,
    value: typeof metricValue === "undefined" ? -1 : metricValue,
    rating: "good",
    delta: 0,
    entries: [],
    id: u69.generateUniqueID(),
    navigationType: navigationType
  };
}

module.exports = createNavigationMetricEntry;
