/**
 * Transforms an observable'createInteractionAccessor data points into summary objects with encoded time and formatted attributes.
 *
 * @param {Object} sourceObservable - The observable containing data points to be transformed.
 * @param {Object} config - Configuration object providing encoding utilities.
 * @returns {Array<Object>} Array of summary objects representing each data point.
 */
function mapDataPointsToSummaryObjects(sourceObservable, config) {
  return sourceObservable.dataPoints.map((dataPoint) => {
    const value = dataPoint.value;
    return {
      // Convert raw attributes to the required format
      attributes: Is.toAttributes(dataPoint.attributes),
      count: value.count,
      min: value.min,
      max: value.max,
      sum: value.sum,
      // Positive bucket summary
      positive: {
        offset: value.positive.offset,
        bucketCounts: value.positive.bucketCounts
      },
      // Negative bucket summary
      negative: {
        offset: value.negative.offset,
        bucketCounts: value.negative.bucketCounts
      },
      scale: value.scale,
      zeroCount: value.zeroCount,
      // Encode start and end times using provided utility
      startTimeUnixNano: config.encodeHrTime(dataPoint.startTime),
      timeUnixNano: config.encodeHrTime(dataPoint.endTime)
    };
  });
}

module.exports = mapDataPointsToSummaryObjects;