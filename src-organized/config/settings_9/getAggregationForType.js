/**
 * Returns the appropriate aggregation instance or constant based on the provided aggregation configuration.
 *
 * @param {Object} aggregationConfig - The aggregation configuration object. Must have a 'type' property and may have an 'options' property.
 * @returns {any} The corresponding aggregation instance or constant for the given type.
 * @throws {Error} If the aggregation type is unsupported.
 */
function getAggregationForType(aggregationConfig) {
  switch (aggregationConfig.type) {
    case W_.DEFAULT:
      // Return the default aggregation constant
      return Y_.DEFAULT_AGGREGATION;
    case W_.DROP:
      // Return the drop aggregation constant
      return Y_.DROP_AGGREGATION;
    case W_.SUM:
      // Return the sum aggregation constant
      return Y_.SUM_AGGREGATION;
    case W_.LAST_VALUE:
      // Return the last value aggregation constant
      return Y_.LAST_VALUE_AGGREGATION;
    case W_.EXPONENTIAL_HISTOGRAM: {
      // Create a new ExponentialHistogramAggregation with options if provided
      const exponentialHistogramConfig = aggregationConfig;
      return new Y_.ExponentialHistogramAggregation(
        exponentialHistogramConfig.options?.maxSize,
        exponentialHistogramConfig.options?.recordMinMax
      );
    }
    case W_.EXPLICIT_BUCKET_HISTOGRAM: {
      // Create a new ExplicitBucketHistogramAggregation with options if provided
      const explicitBucketHistogramConfig = aggregationConfig;
      if (explicitBucketHistogramConfig.options == null) {
        // If no options are provided, return the default histogram aggregation
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

module.exports = getAggregationForType;
