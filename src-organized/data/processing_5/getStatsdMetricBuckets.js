/**
 * Extracts and serializes metric buckets from the provided source, returning
 * metadata and the serialized buckets in a structured format for StatsD reporting.
 *
 * @param {any} metricBucketsSource - The source data to serialize into metric buckets.
 * @returns {[{type: string, length: number}, any]} An array where the first element is an object
 *          containing the type ('statsd') and the number of serialized metric buckets, and the
 *          second element is the serialized metric buckets array.
 */
function getStatsdMetricBuckets(metricBucketsSource) {
  // Serialize the metric buckets using the external M19 dependency
  const serializedMetricBuckets = M19.serializeMetricBuckets(metricBucketsSource);

  // Return metadata and the serialized buckets as a tuple
  return [
    {
      type: "statsd", // Indicates the metric type
      length: serializedMetricBuckets.length // Number of serialized buckets
    },
    serializedMetricBuckets
  ];
}

module.exports = getStatsdMetricBuckets;