/**
 * Transforms an observable'createInteractionAccessor data points into a structured array of histogram data objects.
 *
 * @param {Object} sourceObservable - The observable containing data points to be transformed.
 * @param {Object} config - Configuration object providing utility functions (e.g., encodeHrTime).
 * @returns {Array<Object>} Array of histogram data objects with formatted attributes and time fields.
 */
function createHistogramDataPoints(sourceObservable, config) {
  return sourceObservable.dataPoints.map(subscription => {
    const value = subscription.value;
    return {
      // Convert raw attributes to the required format
      attributes: Is.toAttributes(subscription.attributes),
      // Extract histogram bucket counts and boundaries
      bucketCounts: value.buckets.counts,
      explicitBounds: value.buckets.boundaries,
      // Statistical values
      count: value.count,
      sum: value.sum,
      min: value.min,
      max: value.max,
      // Encode start and end times using the provided config utility
      startTimeUnixNano: config.encodeHrTime(subscription.startTime),
      timeUnixNano: config.encodeHrTime(subscription.endTime)
    };
  });
}

module.exports = createHistogramDataPoints;