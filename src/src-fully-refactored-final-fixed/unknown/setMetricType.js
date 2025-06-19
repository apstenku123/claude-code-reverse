/**
 * Sets the metric type for a given observable using the provided configuration and subscription.
 *
 * @param {Object} sourceObservable - The observable object for which the metric type is being set.
 * @param {Object} config - Configuration options for setting the metric type.
 * @param {Object} subscription - The subscription instance related to the observable.
 * @returns {void}
 */
function setMetricType(sourceObservable, config, subscription) {
  // Call the external addMetricValue function with the SET_METRIC_TYPE constant and the provided arguments
  addMetricValue(C91.SET_METRIC_TYPE, sourceObservable, config, subscription);
}

module.exports = setMetricType;