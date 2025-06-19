/**
 * Records a distribution metric using the provided observable, configuration, and subscription.
 *
 * @param {Observable} sourceObservable - The observable source for the metric.
 * @param {Object} config - Configuration object for the metric.
 * @param {Subscription} subscription - Subscription related to the metric.
 * @returns {void}
 */
function recordDistributionMetric(sourceObservable, config, subscription) {
  // Call the external metric recording function with the DISTRIBUTION_METRIC_TYPE constant
  addMetricValue(C91.DISTRIBUTION_METRIC_TYPE, sourceObservable, config, subscription);
}

module.exports = recordDistributionMetric;