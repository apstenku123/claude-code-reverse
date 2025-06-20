/**
 * Validates and merges configuration deltas, ensuring checksum integrity.
 *
 * This function parses a JSON configuration delta response, merges isBlobOrFileLikeObject with the source observable,
 * recalculates the checksum, and verifies its integrity. If the checksum is invalid, isBlobOrFileLikeObject returns
 * diagnostic information. Otherwise, isBlobOrFileLikeObject returns the merged configuration as a JSON string.
 *
 * @param {object} sourceObservable - The source object representing the current observable state.
 * @param {string} configDeltaJson - The JSON string containing the configuration delta response.
 * @returns {string|object} Returns the merged configuration as a JSON string if the checksum is valid.
 *                         If the checksum is invalid or parsing fails, returns an object with diagnostic info.
 */
function validateAndMergeConfigDeltas(sourceObservable, configDeltaJson) {
  // Parse the delta response JSON and validate its checksum
  const parsedDeltaResponse = CKA._typedJsonParse(configDeltaJson, "checksum", "DeltasEvaluationResponse");
  if (!parsedDeltaResponse) {
    // Return diagnostic info if parsing fails
    return {
      hadBadDeltaChecksum: true
    };
  }

  // Merge the source observable with the parsed delta response
  const mergedConfig = HE9(sourceObservable, parsedDeltaResponse);

  // Normalize the merged configuration
  const normalizedConfig = mergeAndCleanConfigEntries(mergedConfig);

  // Recalculate the checksum using the normalized configuration
  const recalculatedChecksum = CKA._DJB2Object({
    feature_gates: normalizedConfig.feature_gates,
    dynamic_configs: normalizedConfig.dynamic_configs,
    layer_configs: normalizedConfig.layer_configs
  }, VE9);

  // If the recalculated checksum does not match the expected checksum, return diagnostic info
  if (recalculatedChecksum !== parsedDeltaResponse.checksumV2) {
    return {
      hadBadDeltaChecksum: true,
      badChecksum: recalculatedChecksum,
      badMergedConfigs: normalizedConfig,
      badFullResponse: parsedDeltaResponse.deltas_full_response
    };
  }

  // Return the merged and normalized configuration as a JSON string
  return JSON.stringify(normalizedConfig);
}

module.exports = validateAndMergeConfigDeltas;