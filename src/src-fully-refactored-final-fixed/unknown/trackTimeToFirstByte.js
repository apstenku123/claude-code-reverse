/**
 * Tracks the Time To First Byte (TTFB) metric for a given observable source.
 *
 * @param {Observable} sourceObservable - The observable stream to monitor for TTFB.
 * @returns {any} The result of the handleInteractionAndTransaction metric tracking function for TTFB.
 */
function trackTimeToFirstByte(sourceObservable) {
  // Call the generic metric tracker with the 'ttfb' metric type,
  // the source observable, and the required configuration constants.
  return handleInteractionAndTransaction("ttfb", sourceObservable, Z89, VIA);
}

module.exports = trackTimeToFirstByte;