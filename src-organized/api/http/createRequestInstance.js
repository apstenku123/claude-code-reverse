/**
 * Creates a new request instance with extended prototype and instance properties.
 *
 * This function instantiates a new Jl object with the provided configuration, binds its request method,
 * and extends the resulting function with both prototype and instance properties. It also adds a 'create'
 * method to allow creation of new request instances with merged configurations.
 *
 * @param {object} baseConfig - The base configuration object for the request instance.
 * @returns {function} The extended request function with additional properties and a 'create' method.
 */
function createRequestInstance(baseConfig) {
  // Create a new Jl instance with the provided configuration
  const requestInstance = new Jl(baseConfig);

  // Bind the request method from the prototype to the instance
  const boundRequest = pc(Jl.prototype.request, requestInstance);

  // Extend the bound request function with prototype properties from Jl
  DA.extend(boundRequest, Jl.prototype, requestInstance, {
    allOwnKeys: true
  });

  // Extend the bound request function with instance properties
  DA.extend(boundRequest, requestInstance, null, {
    allOwnKeys: true
  });

  // Add a 'create' method to allow creation of new request instances with merged configs
  boundRequest.create = function create(newConfig) {
    // Merge the base config with the new config and create a new instance
    return createRequestInstance(tC(baseConfig, newConfig));
  };

  return boundRequest;
}

module.exports = createRequestInstance;