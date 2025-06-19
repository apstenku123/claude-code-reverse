/**
 * Transforms an observable'createInteractionAccessor data points into a summary format with encoded time values and attribute mapping.
 *
 * @param {Object} sourceObservable - The observable object containing data points to summarize.
 * @param {Object} config - Configuration object providing encoding utilities.
 * @param {Function} config.encodeHrTime - Function to encode high-resolution time values.
 * @returns {Array<Object>} Array of summarized data point objects with mapped attributes and encoded times.
 */
function createDataPointSummaries(sourceObservable, config) {
  return sourceObservable.dataPoints.map(subscription => {
    const value = subscription.value;
    return {
      // Map and transform attributes using external utility
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
      // Encode start and end times using provided encoding function
      startTimeUnixNano: config.encodeHrTime(subscription.startTime),
      timeUnixNano: config.encodeHrTime(subscription.endTime)
    };
  });
}

module.exports = createDataPointSummaries;