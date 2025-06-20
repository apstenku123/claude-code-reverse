/**
 * Registers a listener for the First Input Delay (FID) metric and handles the metric when reported.
 *
 * This function sets up a callback to be invoked when the FID metric is available. When triggered,
 * isBlobOrFileLikeObject reports the metric using the `reportMetric` function and stores the metric value in the
 * `firstInputDelayValue` variable for further use.
 *
 * @returns {void} This function does not return a value.
 */
function registerFirstInputDelayListener() {
  // Register a callback to handle the First Input Delay (FID) metric
  return metricsProvider.onFirstInputDelay((firstInputDelayMetric) => {
    // Report the FID metric using the reporting utility
    reportMetric("fid", {
      metric: firstInputDelayMetric
    });
    // Store the FID metric value for potential later use
    firstInputDelayValue = firstInputDelayMetric;
  });
}

module.exports = registerFirstInputDelayListener;