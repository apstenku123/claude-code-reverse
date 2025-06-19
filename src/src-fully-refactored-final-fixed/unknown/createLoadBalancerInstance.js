/**
 * Creates a new LoadBalancer instance based on the provided source and configuration.
 *
 * @param {Object} sourceObject - An object that provides the load balancer name via getLoadBalancerName().
 * @param {Object} config - Configuration object to be passed to the LoadBalancer constructor.
 * @returns {Object|null} Returns a new LoadBalancer instance if the name exists in the registry, otherwise null.
 */
function createLoadBalancerInstance(sourceObject, config) {
  // Retrieve the load balancer name from the source object
  const loadBalancerName = sourceObject.getLoadBalancerName();

  // Check if the load balancer name exists in the global registry 'uL'
  if (loadBalancerName in uL) {
    // Instantiate and return the corresponding LoadBalancer with the provided config
    return new uL[loadBalancerName].LoadBalancer(config);
  } else {
    // Return null if the load balancer name is not registered
    return null;
  }
}

module.exports = createLoadBalancerInstance;