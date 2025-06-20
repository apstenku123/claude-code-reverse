/**
 * Creates a new LoadBalancer instance if the given source provides a known load balancer name.
 *
 * @param {Object} sourceObject - An object that must implement getLoadBalancerName(), returning a string.
 * @param {any} loadBalancerConfig - Configuration to be passed to the LoadBalancer constructor.
 * @returns {Object|null} Returns a new LoadBalancer instance if the name exists in the registry, otherwise null.
 */
function createLoadBalancerInstanceIfAvailable(sourceObject, loadBalancerConfig) {
  // Retrieve the load balancer name from the source object
  const loadBalancerName = sourceObject.getLoadBalancerName();

  // Check if the load balancer name exists in the registry (uL)
  if (loadBalancerName in uL) {
    // Instantiate and return the LoadBalancer with the provided config
    return new uL[loadBalancerName].LoadBalancer(loadBalancerConfig);
  } else {
    // Return null if the load balancer name is not registered
    return null;
  }
}

module.exports = createLoadBalancerInstanceIfAvailable;