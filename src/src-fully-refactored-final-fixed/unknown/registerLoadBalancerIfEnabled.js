/**
 * Registers a load balancer type if load balancing is enabled in the configuration.
 *
 * @returns {void} Does not return a value.
 */
function registerLoadBalancerIfEnabled() {
  // Check if load balancing is enabled before registering the load balancer type
  if (isLoadBalancingEnabled) {
    loadBalancerRegistry.registerLoadBalancerType(
      loadBalancerType,
      loadBalancerVersion,
      loadBalancerOptions
    );
  }
}

module.exports = registerLoadBalancerIfEnabled;