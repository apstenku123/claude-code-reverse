/**
 * Creates a load balancing configuration object from a JSON input.
 *
 * This function expects an object with exactly one key, which should correspond
 * to a recognized load balancing policy name. It validates the input, checks for
 * the existence of the policy, and delegates the creation of the configuration
 * to the appropriate handler. Throws descriptive errors for invalid input or
 * unrecognized policy names.
 *
 * @param {Object} loadBalancingConfigJson - An object representing the load balancing config, keyed by policy name.
 * @returns {Object} The created load balancing configuration object.
 * @throws {Error} If the input contains multiple keys or an unrecognized policy name, or if creation fails.
 */
function createLoadBalancingConfigFromJson(loadBalancingConfigJson) {
  // Extract all keys from the input config object
  const configKeys = Object.keys(loadBalancingConfigJson);

  // Ensure there is exactly one config entry
  if (configKeys.length !== 1) {
    throw new Error("Provided load balancing config has multiple conflicting entries");
  }

  // The policy name is the single key in the config
  const policyName = configKeys[0];

  // Check if the policy name is recognized
  if (policyName in uL) {
    try {
      // Delegate creation to the policy'createInteractionAccessor handler
      return uL[policyName].LoadBalancingConfig.createFromJson(loadBalancingConfigJson[policyName]);
    } catch (error) {
      // Wrap and rethrow errors with policy context
      throw new Error(`${policyName}: ${error.message}`);
    }
  } else {
    // Policy name is not recognized
    throw new Error(`Unrecognized load balancing config name ${policyName}`);
  }
}

module.exports = createLoadBalancingConfigFromJson;