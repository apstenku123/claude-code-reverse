/**
 * Tracks the Largest Contentful Paint (LCP) metric for performance monitoring.
 *
 * @param {Observable} sourceObservable - The observable stream to monitor for LCP events.
 * @param {boolean} [isConfigEnabled=false] - Optional flag to enable or disable additional configuration.
 * @returns {any} The result of the LCP tracking operation, as returned by the handleInteractionAndTransaction function.
 */
function trackLargestContentfulPaint(sourceObservable, isConfigEnabled = false) {
  // Delegates to the handleInteractionAndTransaction function with the LCP metric identifier and provided parameters
  return handleInteractionAndTransaction("lcp", sourceObservable, G89, CIA, isConfigEnabled);
}

module.exports = trackLargestContentfulPaint;