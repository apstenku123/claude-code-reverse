/**
 * Validates the checksum of a deltas evaluation response and merges configuration deltas if valid.
 *
 * @param {object} sourceObservable - The source observable or data used for merging deltas.
 * @param {string} configJson - The JSON string representing the deltas evaluation response.
 * @returns {string|object} Returns the merged configuration as a JSON string if the checksum is valid.
 *   If the checksum is invalid, returns an object with details about the bad checksum and merged configs.
 */
function validateAndMergeDeltasEvaluationResponse(sourceObservable, configJson) {
  // Parse the config JSON, expecting a DeltasEvaluationResponse with a checksum
  const deltasEvaluationResponse = CKA._typedJsonParse(configJson, "checksum", "DeltasEvaluationResponse");
  if (!deltasEvaluationResponse) {
    // If parsing fails, indicate a bad delta checksum
    return {
      hadBadDeltaChecksum: true
    };
  }

  // Merge the deltas using the provided observable and the parsed response
  const mergedConfigs = HE9(sourceObservable, deltasEvaluationResponse);

  // Normalize/transform the merged configs
  const normalizedConfigs = mergeAndCleanConfigEntries(mergedConfigs);

  // Compute the checksum for the merged configs using DJB2 hash
  const computedChecksum = CKA._DJB2Object({
    feature_gates: normalizedConfigs.feature_gates,
    dynamic_configs: normalizedConfigs.dynamic_configs,
    layer_configs: normalizedConfigs.layer_configs
  }, VE9);

  // If the computed checksum does not match the expected checksum, return error details
  if (computedChecksum !== deltasEvaluationResponse.checksumV2) {
    return {
      hadBadDeltaChecksum: true,
      badChecksum: computedChecksum,
      badMergedConfigs: normalizedConfigs,
      badFullResponse: deltasEvaluationResponse.deltas_full_response
    };
  }

  // If everything is valid, return the merged configs as a JSON string
  return JSON.stringify(normalizedConfigs);
}

module.exports = validateAndMergeDeltasEvaluationResponse;
