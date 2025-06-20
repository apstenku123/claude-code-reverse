/**
 * Adds web vitals (LCP and CLS) measurement tags to the provided observable.
 *
 * @param {Object} observable - The observable or span to which measurement tags will be added. Must implement setTag(key, value).
 * @returns {void}
 *
 * This function checks for the presence of Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) data
 * and adds relevant tags to the provided observable for monitoring or logging purposes.
 */
function addWebVitalsTagsToObservable(observable) {
  // Check if LCP (Largest Contentful Paint) data is available
  if (lcpData) {
    // If in debug mode, log that LCP data is being added
    if (runtimeConfig.DEBUG_BUILD) {
      logger.log("[Measurements] Adding LCP Data");
    }

    // Add LCP element tag if element exists
    if (lcpData.element) {
      const lcpElementString = htmlTreeAsString(lcpData.element);
      observable.setTag("lcp.element", lcpElementString);
    }

    // Add LCP id tag if id exists
    if (lcpData.id) {
      observable.setTag("lcp.id", lcpData.id);
    }

    // Add LCP url tag if url exists (trimmed and limited to 200 chars)
    if (lcpData.url) {
      const trimmedUrl = lcpData.url.trim().slice(0, 200);
      observable.setTag("lcp.url", trimmedUrl);
    }

    // Add LCP size tag
    observable.setTag("lcp.size", lcpData.size);
  }

  // Check if CLS (Cumulative Layout Shift) data and sources are available
  if (clsData && clsData.sources) {
    // If in debug mode, log that CLS data is being added
    if (runtimeConfig.DEBUG_BUILD) {
      logger.log("[Measurements] Adding CLS Data");
    }

    // Add a tag for each CLS source node
    clsData.sources.forEach((clsSource, index) => {
      const clsSourceString = htmlTreeAsString(clsSource.node);
      observable.setTag(`cls.source.${index + 1}`, clsSourceString);
    });
  }
}

// External dependencies assumed to be available in the module scope:
// - lcpData: Object containing LCP measurement data
// - clsData: Object containing CLS measurement data
// - htmlTreeAsString: Function to serialize DOM nodes
// - runtimeConfig: Configuration object with DEBUG_BUILD flag
// - logger: Logger object with log method

module.exports = addWebVitalsTagsToObservable;
