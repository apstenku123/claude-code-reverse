/**
 * Selects the appropriate Aggregation Temporality Selector based on the provided preference.
 *
 * @param {string|null|undefined} temporalityPreference - The desired aggregation temporality preference. Should be one of the values defined in rM0.AggregationTemporalityPreference.
 * @returns {Function|any} The corresponding temporality selector function, or the default selector if preference is not provided.
 */
function selectAggregationTemporalitySelector(temporalityPreference) {
  // Check if a temporality preference is provided
  if (temporalityPreference != null) {
    // Return the Delta selector if the preference is DELTA
    if (temporalityPreference === rM0.AggregationTemporalityPreference.DELTA) {
      return tM0.DeltaTemporalitySelector;
    }
    // Return the Low Memory selector if the preference is LOWMEMORY
    else if (temporalityPreference === rM0.AggregationTemporalityPreference.LOWMEMORY) {
      return tM0.LowMemoryTemporalitySelector;
    }
    // Default to the Cumulative selector for any other provided preference
    return tM0.CumulativeTemporalitySelector;
  }
  // If no preference is provided, fall back to the default selector
  return getOtelMetricsTemporalitySelector();
}

module.exports = selectAggregationTemporalitySelector;