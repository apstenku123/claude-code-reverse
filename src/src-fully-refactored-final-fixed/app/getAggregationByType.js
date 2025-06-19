/**
 * Returns the appropriate aggregation instance or constant based on the provided aggregation configuration.
 *
 * @param {Object} aggregationConfig - The aggregation configuration object. Must have a 'type' property and may have an 'options' property.
 * @returns {any} The corresponding aggregation instance or constant for the specified type.
 * @throws {Error} If the aggregation type is not supported.
 */
function getAggregationByType(aggregationConfig) {
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
      // Return a new ExponentialHistogramAggregation instance with options if provided
      const options = aggregationConfig.options;
      return new Y_.ExponentialHistogramAggregation(options?.maxSize, options?.recordMinMax);
    }
    case W_.EXPLICIT_BUCKET_HISTOGRAM: {
      // If no options are provided, return the default histogram aggregation
      const options = aggregationConfig.options;
      if (options == null) {
        return Y_.HISTOGRAM_AGGREGATION;
      } else {
        // Return a new ExplicitBucketHistogramAggregation instance with boundaries and recordMinMax if provided
        return new Y_.ExplicitBucketHistogramAggregation(options?.boundaries, options?.recordMinMax);
      }
    }
    default:
      // Throw an error for unsupported aggregation types
      throw new Error("Unsupported Aggregation");
  }
}

module.exports = getAggregationByType;