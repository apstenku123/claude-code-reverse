/**
 * Adds web vitals (LCP and CLS) measurement data as tags to the provided span.
 *
 * @param {object} span - The span or telemetry object to which measurement tags will be added. Must have a setTag(key, value) method.
 * @returns {void}
 *
 * This function checks for the presence of Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) data
 * and attaches relevant information as tags to the provided span. It also logs debug information if enabled.
 */
function addWebVitalsTagsToSpan(span) {
  // Check if LCP (Largest Contentful Paint) data is available
  if (lcpData) {
    // Log debug info if in debug build
    if (runtimeConfig.DEBUG_BUILD && logger.logger.log) {
      logger.logger.log("[Measurements] Adding LCP Data");
    }

    // Add LCP element as a tag if available
    if (lcpData.element) {
      span.setTag("lcp.element", logger.htmlTreeAsString(lcpData.element));
    }

    // Add LCP id as a tag if available
    if (lcpData.id) {
      span.setTag("lcp.id", lcpData.id);
    }

    // Add LCP url as a tag if available, trimmed and limited to 200 chars
    if (lcpData.url) {
      span.setTag("lcp.url", lcpData.url.trim().slice(0, 200));
    }

    // Add LCP size as a tag
    span.setTag("lcp.size", lcpData.size);
  }

  // Check if CLS (Cumulative Layout Shift) data and sources are available
  if (clsData && clsData.sources) {
    // Log debug info if in debug build
    if (runtimeConfig.DEBUG_BUILD && logger.logger.log) {
      logger.logger.log("[Measurements] Adding CLS Data");
    }

    // Add each CLS source node as a tag
    clsData.sources.forEach((source, index) => {
      span.setTag(
        `cls.source.${index + 1}`,
        logger.htmlTreeAsString(source.node)
      );
    });
  }
}

module.exports = addWebVitalsTagsToSpan;