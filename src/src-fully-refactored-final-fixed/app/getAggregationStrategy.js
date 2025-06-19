/**
 * Returns the appropriate aggregation strategy instance or constant based on the provided aggregation configuration.
 *
 * @param {Object} aggregationConfig - The aggregation configuration object. Must have a 'type' property and may have an 'options' property.
 * @returns {any} The corresponding aggregation strategy instance or constant.
 * @throws {Error} If the aggregation type is unsupported.
 */
function getAggregationStrategy(aggregationConfig) {
  switch (aggregationConfig.type) {
    case W_.DEFAULT:
      // Return the default aggregation strategy
      return Y_.DEFAULT_AGGREGATION;
    case W_.DROP:
      // Return the drop aggregation strategy
      return Y_.DROP_AGGREGATION;
    case W_.SUM:
      // Return the sum aggregation strategy
      return Y_.SUM_AGGREGATION;
    case W_.LAST_VALUE:
      // Return the last value aggregation strategy
      return Y_.LAST_VALUE_AGGREGATION;
    case W_.EXPONENTIAL_HISTOGRAM: {
      // Return a new exponential histogram aggregation with provided options
      const exponentialHistogramConfig = aggregationConfig;
      return new Y_.ExponentialHistogramAggregation(
        exponentialHistogramConfig.options?.maxSize,
        exponentialHistogramConfig.options?.recordMinMax
      );
    }
    case W_.EXPLICIT_BUCKET_HISTOGRAM: {
      // Return a new explicit bucket histogram aggregation or the default if options are missing
      const explicitBucketHistogramConfig = aggregationConfig;
      if (explicitBucketHistogramConfig.options == null) {
        return Y_.HISTOGRAM_AGGREGATION;
      } else {
        return new Y_.ExplicitBucketHistogramAggregation(
          explicitBucketHistogramConfig.options?.boundaries,
          explicitBucketHistogramConfig.options?.recordMinMax
        );
      }
    }
    default:
      // Throw an error for unsupported aggregation types
      throw new Error("Unsupported Aggregation");
  }
}

module.exports = getAggregationStrategy;