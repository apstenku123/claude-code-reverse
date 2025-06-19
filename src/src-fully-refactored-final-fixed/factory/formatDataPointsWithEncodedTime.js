/**
 * Transforms an array of data points by formatting their attributes and encoding their start and end times.
 *
 * @param {Object} sourceObservable - The source object containing an array of data points to be formatted.
 * @param {Object} config - Configuration object providing utility functions for encoding time values.
 * @returns {Array<Object>} An array of formatted data point objects with encoded time fields and mapped attributes.
 */
function formatDataPointsWithEncodedTime(sourceObservable, config) {
  return sourceObservable.dataPoints.map(subscription => {
    const value = subscription.value;
    return {
      // Convert raw attributes to the required format
      attributes: Is.toAttributes(subscription.attributes),
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
      // Encode start and end times using provided utility
      startTimeUnixNano: config.encodeHrTime(subscription.startTime),
      timeUnixNano: config.encodeHrTime(subscription.endTime)
    };
  });
}

module.exports = formatDataPointsWithEncodedTime;