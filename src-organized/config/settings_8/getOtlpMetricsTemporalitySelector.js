/**
 * Retrieves the OTLP metrics temporality selector based on the environment variable
 * 'OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE'.
 *
 * Supported values (case-insensitive):
 *   - 'cumulative' (default)
 *   - 'delta'
 *   - 'lowmemory'
 *
 * If the environment variable is set to an unsupported value, a warning is logged
 * and the default ('cumulative') selector is returned.
 *
 * @returns {any} The temporality selector corresponding to the environment setting.
 */
function getOtlpMetricsTemporalitySelector() {
  // Retrieve the environment variable or use 'cumulative' as the default
  const temporalityPreferenceRaw = s16.getStringFromEnv("OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE") ?? "cumulative";
  const temporalityPreference = temporalityPreferenceRaw.toLowerCase();

  // Return the appropriate temporality selector based on the preference
  if (temporalityPreference === "cumulative") {
    return tM0.CumulativeTemporalitySelector;
  }
  if (temporalityPreference === "delta") {
    return tM0.DeltaTemporalitySelector;
  }
  if (temporalityPreference === "lowmemory") {
    return tM0.LowMemoryTemporalitySelector;
  }

  // Log a warning for unsupported values and return the default selector
  o16.diag.warn(
    `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE is set to '${temporalityPreference}', but only 'cumulative' and 'delta' are allowed. Using default ('cumulative') instead.`
  );
  return tM0.CumulativeTemporalitySelector;
}

module.exports = getOtlpMetricsTemporalitySelector;