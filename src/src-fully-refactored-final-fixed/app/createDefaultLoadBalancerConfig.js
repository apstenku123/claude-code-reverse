/**
 * Creates a new instance of the default load balancer configuration.
 * Throws an error if no default load balancer type is registered.
 *
 * @returns {object} An instance of the default LoadBalancingConfig class.
 * @throws {Error} If no default load balancer type is registered.
 */
function createDefaultLoadBalancerConfig() {
  // Check if the default load balancer type is registered
  if (!defaultLoadBalancerTypeKey) {
    throw new Error("No default load balancer type registered");
  }

  // Retrieve the LoadBalancingConfig class from the loadBalancerRegistry using the type key
  const LoadBalancingConfigClass = loadBalancerRegistry[defaultLoadBalancerTypeKey].LoadBalancingConfig;

  // Create and return a new instance of the LoadBalancingConfig class
  return new LoadBalancingConfigClass();
}

module.exports = createDefaultLoadBalancerConfig;