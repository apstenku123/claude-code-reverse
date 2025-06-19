/**
 * Retrieves serialized metric buckets and returns their type and length metadata along with the buckets themselves.
 *
 * @param {any} metricBucketsSource - The source data to be serialized into metric buckets.
 * @returns {[{type: string, length: number}, any[]]} An array containing a metadata object and the serialized metric buckets.
 */
function getStatsdMetricBucketsInfo(metricBucketsSource) {
  // Serialize the metric buckets using the external M19 dependency
  const serializedBuckets = M19.serializeMetricBuckets(metricBucketsSource);

  // Return an array with metadata and the serialized buckets
  return [
    {
      type: "statsd", // Indicates the type of metric
      length: serializedBuckets.length // Number of buckets
    },
    serializedBuckets
  ];
}

module.exports = getStatsdMetricBucketsInfo;