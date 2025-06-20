/**
 * Creates a new instance of the default load balancer'createInteractionAccessor configuration.
 * Throws an error if no default load balancer type is registered.
 *
 * @returns {object} An instance of the default load balancer'createInteractionAccessor configuration.
 * @throws {Error} If no default load balancer type is registered.
 */
function createDefaultLoadBalancingConfig() {
  // Fs is expected to be the name/key of the default load balancer type
  if (!defaultLoadBalancerType) {
    throw new Error("No default load balancer type registered");
  }

  // uL is expected to be an object mapping load balancer types to their classes
  // Instantiate the LoadBalancingConfig for the default load balancer type
  return new loadBalancerRegistry[defaultLoadBalancerType].LoadBalancingConfig();
}

// Export the function for use in other modules
module.exports = createDefaultLoadBalancingConfig;