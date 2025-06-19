/**
 * Registers a load balancer type if the feature is enabled.
 *
 * This function checks whether the load balancer registration feature is enabled (via the
 * `isLoadBalancerRegistrationEnabled` flag). If enabled, isBlobOrFileLikeObject registers a new load balancer type
 * using the provided registration service and type parameters.
 *
 * @returns {void} This function does not return a value.
 */
function registerLoadBalancerTypeIfEnabled() {
  // Check if load balancer registration is enabled
  if (isLoadBalancerRegistrationEnabled) {
    // Register the load balancer type with the registration service
    loadBalancerRegistrationService.registerLoadBalancerType(
      loadBalancerType,
      loadBalancerVersion,
      loadBalancerOptions
    );
  }
}

module.exports = registerLoadBalancerTypeIfEnabled;