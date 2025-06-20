/**
 * Adds Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) measurement tags to the provided taggable object.
 *
 * @param {Object} taggable - An object that supports setTag(key, value) for adding measurement tags.
 * @returns {void}
 *
 * This function checks for the presence of global LCP and CLS data (dH and Pc),
 * and, if available, adds relevant tags to the provided taggable object.
 *
 * External dependencies:
 * - dH: Global LCP data object
 * - Pc: Global CLS data object
 * - k8.htmlTreeAsString: Utility to serialize DOM nodes
 * - rW.DEBUG_BUILD: Debug flag
 * - k8.logger.log: Logger utility
 */
function addWebVitalsTags(taggable) {
  // Add LCP (Largest Contentful Paint) data if available
  if (typeof dH !== 'undefined' && dH) {
    if (rW.DEBUG_BUILD) {
      k8.logger.log("[Measurements] Adding LCP Data");
    }
    // Add LCP element as a tag if present
    if (dH.element) {
      taggable.setTag("lcp.element", k8.htmlTreeAsString(dH.element));
    }
    // Add LCP id as a tag if present
    if (dH.id) {
      taggable.setTag("lcp.id", dH.id);
    }
    // Add LCP url as a tag if present, trimmed and limited to 200 chars
    if (dH.url) {
      taggable.setTag("lcp.url", dH.url.trim().slice(0, 200));
    }
    // Add LCP size as a tag
    taggable.setTag("lcp.size", dH.size);
  }

  // Add CLS (Cumulative Layout Shift) data if available
  if (typeof Pc !== 'undefined' && Pc && Array.isArray(Pc.sources)) {
    if (rW.DEBUG_BUILD) {
      k8.logger.log("[Measurements] Adding CLS Data");
    }
    // For each CLS source, add a tag with its serialized DOM node
    Pc.sources.forEach((clsSource, index) => {
      taggable.setTag(
        `cls.source.${index + 1}`,
        k8.htmlTreeAsString(clsSource.node)
      );
    });
  }
}

module.exports = addWebVitalsTags;