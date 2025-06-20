/**
 * Transforms an array of data points from an observable into a summary of metric statistics.
 *
 * Each data point is mapped to an object containing its attributes, count, min, max, sum, positive/negative buckets,
 * scale, zero count, and encoded start/end times. Attribute conversion and time encoding are delegated to external helpers.
 *
 * @param {Object} sourceObservable - The observable object containing the dataPoints array.
 * @param {Object} config - Configuration object with helper functions (e.g., encodeHrTime).
 * @returns {Array<Object>} Array of metric summary objects for each data point.
 */
function mapDataPointsToMetricSummaries(sourceObservable, config) {
  return sourceObservable.dataPoints.map((dataPoint) => {
    const value = dataPoint.value;
    return {
      // Convert raw attributes to the required format
      attributes: Is.toAttributes(dataPoint.attributes),
      count: value.count,
      min: value.min,
      max: value.max,
      sum: value.sum,
      positive: {
        offset: value.positive.offset,
        bucketCounts: value.positive.bucketCounts
      },
      negative: {
        offset: value.negative.offset,
        bucketCounts: value.negative.bucketCounts
      },
      scale: value.scale,
      zeroCount: value.zeroCount,
      // Encode start and end times using provided helper
      startTimeUnixNano: config.encodeHrTime(dataPoint.startTime),
      timeUnixNano: config.encodeHrTime(dataPoint.endTime)
    };
  });
}

module.exports = mapDataPointsToMetricSummaries;