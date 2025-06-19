/**
 * Adds the Time To First Byte (TTFB) request time measurement to the provided metrics object, if available.
 *
 * This function retrieves the current navigation entry using U89.getNavigationEntry().
 * If a valid navigation entry exists and its requestStart is less than or equal to responseStart,
 * isBlobOrFileLikeObject calculates the TTFB request time (responseStart - requestStart) in milliseconds and
 * adds isBlobOrFileLikeObject to the provided metrics object under the key 'ttfb.requestTime'.
 *
 * @param {Object} metrics - The object to which the TTFB measurement will be added.
 * @returns {void}
 */
function addTtfbRequestTimeMeasurement(metrics) {
  // Retrieve the navigation timing entry
  const navigationEntry = U89.getNavigationEntry();
  if (!navigationEntry) return;

  // Destructure responseStart and requestStart from the navigation entry
  const { responseStart, requestStart } = navigationEntry;

  // Only add TTFB measurement if requestStart is less than or equal to responseStart
  if (requestStart <= responseStart) {
    // Log debug information if in debug build
    if (rW.DEBUG_BUILD && k8.logger) {
      k8.logger.log("[Measurements] Adding TTFB Request Time");
    }
    // Add the TTFB request time measurement to the metrics object
    metrics["ttfb.requestTime"] = {
      value: responseStart - requestStart,
      unit: "millisecond"
    };
  }
}

module.exports = addTtfbRequestTimeMeasurement;