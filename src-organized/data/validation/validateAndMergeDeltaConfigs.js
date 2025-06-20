/**
 * Validates and merges delta configuration responses, ensuring checksum integrity.
 *
 * This function parses a configuration response, merges isBlobOrFileLikeObject with a source observable,
 * and verifies the checksum of the merged result. If the checksum is invalid, isBlobOrFileLikeObject returns
 * detailed information about the failure; otherwise, isBlobOrFileLikeObject returns the merged configuration as a JSON string.
 *
 * @param {object} sourceObservable - The source observable or configuration object to merge with the delta response.
 * @param {string} configJson - The JSON string representing the delta configuration response.
 * @returns {string|object} Returns the merged configuration as a JSON string if the checksum is valid; otherwise, returns an object with error details.
 */
function validateAndMergeDeltaConfigs(sourceObservable, configJson) {
  // Parse the delta configuration response with type and checksum validation
  const deltaResponse = CKA._typedJsonParse(configJson, "checksum", "DeltasEvaluationResponse");

  // If parsing fails, return an error indicating a bad checksum
  if (!deltaResponse) {
    return {
      hadBadDeltaChecksum: true
    };
  }

  // Merge the source observable with the delta response
  const mergedConfigs = HE9(sourceObservable, deltaResponse);

  // Normalize or further process the merged configs
  const normalizedConfigs = mergeAndCleanConfigEntries(mergedConfigs);

  // Compute the checksum of the merged configuration object
  const computedChecksum = CKA._DJB2Object({
    feature_gates: normalizedConfigs.feature_gates,
    dynamic_configs: normalizedConfigs.dynamic_configs,
    layer_configs: normalizedConfigs.layer_configs
  }, VE9);

  // If the computed checksum does not match the expected checksum, return error details
  if (computedChecksum !== deltaResponse.checksumV2) {
    return {
      hadBadDeltaChecksum: true,
      badChecksum: computedChecksum,
      badMergedConfigs: normalizedConfigs,
      badFullResponse: deltaResponse.deltas_full_response
    };
  }

  // If everything is valid, return the merged configuration as a JSON string
  return JSON.stringify(normalizedConfigs);
}

module.exports = validateAndMergeDeltaConfigs;