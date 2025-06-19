/**
 * Validates a load balancing configuration object and extracts its single policy.
 *
 * This function ensures that the provided configuration object:
 *   - Is a non-null object
 *   - Contains exactly one key (the policy name)
 * If these conditions are not met, isBlobOrFileLikeObject throws an error with a descriptive message.
 *
 * @param {Object} loadBalancingConfig - The load balancing configuration object to validate and extract.
 * @returns {Object} An object containing only the single policy key and its value from the input.
 * @throws {Error} If the input is not a non-null object, has zero keys, or has more than one key.
 */
function validateAndExtractLoadBalancingConfig(loadBalancingConfig) {
  // Ensure the input is a non-null object
  if (typeof loadBalancingConfig !== "object" || loadBalancingConfig === null) {
    throw new Error(`Invalid loadBalancingConfig: unexpected type ${typeof loadBalancingConfig}`);
  }

  // Get all keys from the configuration object
  const policyKeys = Object.keys(loadBalancingConfig);

  // There must be exactly one policy key
  if (policyKeys.length > 1) {
    throw new Error(`Invalid loadBalancingConfig: unexpected multiple keys ${policyKeys}`);
  }
  if (policyKeys.length === 0) {
    throw new Error("Invalid loadBalancingConfig: load balancing policy name required");
  }

  // Return an object with only the single policy key and its value
  return {
    [policyKeys[0]]: loadBalancingConfig[policyKeys[0]]
  };
}

module.exports = validateAndExtractLoadBalancingConfig;