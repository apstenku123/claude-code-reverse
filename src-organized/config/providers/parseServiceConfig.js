/**
 * Parses and validates a gRPC service configuration object.
 *
 * This function processes the provided service configuration object, extracting and validating
 * load balancing policies, load balancing configs, method configs, and retry throttling settings.
 * It also ensures that there are no duplicate method names across all method configs.
 *
 * @param {Object} serviceConfig - The raw service configuration object to parse and validate.
 * @returns {Object} The validated and normalized service configuration object.
 * @throws {Error} If the configuration is invalid or contains duplicate method names.
 */
function parseServiceConfig(serviceConfig) {
  const parsedConfig = {
    loadBalancingConfig: [],
    methodConfig: []
  };

  // Validate and assign loadBalancingPolicy if present
  if ("loadBalancingPolicy" in serviceConfig) {
    if (typeof serviceConfig.loadBalancingPolicy === "string") {
      parsedConfig.loadBalancingPolicy = serviceConfig.loadBalancingPolicy;
    } else {
      throw new Error("Invalid service config: invalid loadBalancingPolicy");
    }
  }

  // Validate and process loadBalancingConfig array if present
  if ("loadBalancingConfig" in serviceConfig) {
    if (Array.isArray(serviceConfig.loadBalancingConfig)) {
      for (const loadBalancingConfigEntry of serviceConfig.loadBalancingConfig) {
        parsedConfig.loadBalancingConfig.push(validateAndExtractLoadBalancingConfig(loadBalancingConfigEntry));
      }
    } else {
      throw new Error("Invalid service config: invalid loadBalancingConfig");
    }
  }

  // Validate and process methodConfig array if present
  if ("methodConfig" in serviceConfig) {
    if (Array.isArray(serviceConfig.methodConfig)) {
      for (const methodConfigEntry of serviceConfig.methodConfig) {
        parsedConfig.methodConfig.push(parseMethodConfig(methodConfigEntry));
      }
    }
  }

  // Process retryThrottling if present
  if ("retryThrottling" in serviceConfig) {
    parsedConfig.retryThrottling = validateAndFormatRetryThrottlingConfig(serviceConfig.retryThrottling);
  }

  // Check for duplicate method names across all method configs
  const seenMethodNames = [];
  for (const methodConfig of parsedConfig.methodConfig) {
    for (const methodName of methodConfig.name) {
      // Check for duplicates by comparing service and method
      for (const seenName of seenMethodNames) {
        if (methodName.service === seenName.service && methodName.method === seenName.method) {
          throw new Error(`Invalid service config: duplicate name ${methodName.service}/${methodName.method}`);
        }
      }
      seenMethodNames.push(methodName);
    }
  }

  return parsedConfig;
}

module.exports = parseServiceConfig;