/**
 * Creates and returns a LoadBalancer instance for a given source if available.
 *
 * @param {Object} sourceObject - An object that provides a getLoadBalancerName() method.
 * @param {any} loadBalancerConfig - Configuration to pass to the LoadBalancer constructor.
 * @returns {Object|null} Returns a new LoadBalancer instance if the load balancer name exists in the registry, otherwise null.
 */
function createLoadBalancerInstanceIfExists(sourceObject, loadBalancerConfig) {
  // Retrieve the load balancer name from the source object
  const loadBalancerName = sourceObject.getLoadBalancerName();

  // Check if the load balancer name exists in the registry (uL)
  if (loadBalancerName in uL) {
    // Instantiate and return the LoadBalancer with the provided config
    return new uL[loadBalancerName].LoadBalancer(loadBalancerConfig);
  } else {
    // Return null if the load balancer name is not found
    return null;
  }
}

module.exports = createLoadBalancerInstanceIfExists;