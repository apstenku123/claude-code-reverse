/**
 * Maps each data point in the source observable to a new value using a transformation function.
 *
 * @param {Object} sourceObservable - The observable object containing data points and a descriptor.
 * @param {Object} config - Configuration object passed to the transformation function.
 * @returns {Array<any>} An array of transformed data points.
 */
function mapDataPointsWithValueType(sourceObservable, config) {
  // For each data point, apply the transformation using its value type and the provided config
  return sourceObservable.dataPoints.map(subscription => {
    return formatMetricValue(subscription, sourceObservable.descriptor.valueType, config);
  });
}

module.exports = mapDataPointsWithValueType;