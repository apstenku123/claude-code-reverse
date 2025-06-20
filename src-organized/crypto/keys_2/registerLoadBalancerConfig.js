/**
 * Registers a load balancer and its configuration for a given key in the global uL object.
 *
 * @param {string|number} key - The unique identifier for the load balancer entry in the uL object.
 * @param {object} loadBalancer - The load balancer instance or configuration to associate with the key.
 * @param {object} loadBalancingConfig - The configuration object for load balancing.
 * @returns {void}
 */
function registerLoadBalancerConfig(key, loadBalancer, loadBalancingConfig) {
  // Store the load balancer and its configuration under the specified key in the global uL object
  uL[key] = {
    LoadBalancer: loadBalancer,
    LoadBalancingConfig: loadBalancingConfig
  };
}

module.exports = registerLoadBalancerConfig;