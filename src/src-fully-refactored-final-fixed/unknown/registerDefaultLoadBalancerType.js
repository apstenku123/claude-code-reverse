/**
 * Registers a load balancer type with the system.
 *
 * This function registers a specific load balancer type by providing
 * the load balancer class, its configuration, and its metadata to the
 * load balancer registry. This enables the system to recognize and utilize
 * the specified load balancer type.
 *
 * @returns {void} This function does not return a value.
 */
function registerDefaultLoadBalancerType() {
  // Register the load balancer type with the registry
  // Arguments:
  //   loadBalancerClass: The class or constructor for the load balancer
  //   loadBalancerConfig: The configuration object for the load balancer
  //   loadBalancerMetadata: Metadata describing the load balancer
  uy0.registerLoadBalancerType(
    LoadBalancerClass,
    LoadBalancerConfig,
    LoadBalancerMetadata
  );
}

module.exports = registerDefaultLoadBalancerType;