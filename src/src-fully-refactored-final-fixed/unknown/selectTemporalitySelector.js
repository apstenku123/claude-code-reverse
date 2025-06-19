/**
 * Selects the appropriate temporality selector function based on the provided aggregation temporality preference.
 *
 * @param {string|null|undefined} aggregationTemporalityPreference - The user'createInteractionAccessor preferred aggregation temporality. Should be one of the values defined in rM0.AggregationTemporalityPreference.
 * @returns {Function} The corresponding temporality selector function, or the default selector if preference is not provided.
 */
function selectTemporalitySelector(aggregationTemporalityPreference) {
  // If a preference is provided, select the appropriate temporality selector
  if (aggregationTemporalityPreference != null) {
    if (
      aggregationTemporalityPreference === rM0.AggregationTemporalityPreference.DELTA
    ) {
      // Return the Delta temporality selector if DELTA is preferred
      return tM0.DeltaTemporalitySelector;
    } else if (
      aggregationTemporalityPreference === rM0.AggregationTemporalityPreference.LOWMEMORY
    ) {
      // Return the LowMemory temporality selector if LOWMEMORY is preferred
      return tM0.LowMemoryTemporalitySelector;
    }
    // Default to Cumulative temporality selector if preference is neither DELTA nor LOWMEMORY
    return tM0.CumulativeTemporalitySelector;
  }
  // If no preference is provided, use the fallback selector
  return getOtelMetricsTemporalitySelector();
}

module.exports = selectTemporalitySelector;