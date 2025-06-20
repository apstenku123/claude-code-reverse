/**
 * Records a gauge metric using the provided observable, configuration, and subscription.
 *
 * @param {Observable} sourceObservable - The observable source representing the metric value.
 * @param {Object} config - Configuration options for the gauge metric.
 * @param {Subscription} subscription - Subscription object for managing the metric'createInteractionAccessor lifecycle.
 * @returns {void}
 *
 * This function delegates to addMetricValue with the GAUGE_METRIC_TYPE constant and the provided parameters.
 */
function recordGaugeMetric(sourceObservable, config, subscription) {
  // Call the external addMetricValue function to record a gauge metric
  addMetricValue(C91.GAUGE_METRIC_TYPE, sourceObservable, config, subscription);
}

module.exports = recordGaugeMetric;