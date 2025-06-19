/**
 * Creates a request function bound to a new Jl instance, extending isBlobOrFileLikeObject with prototype and instance properties.
 * Also adds a .create method for generating new request functions with merged configurations.
 *
 * @param {object} baseConfig - The base configuration object for the Jl instance.
 * @returns {function} The extended request function with additional properties and a .create method.
 */
function createRequestFunctionWithPrototypeExtensions(baseConfig) {
  // Create a new Jl instance with the provided base configuration
  const jlInstance = new Jl(baseConfig);

  // Bind the request method from Jl.prototype to the new instance
  const boundRequestFunction = createBoundFunction(Jl.prototype.request, jlInstance);

  // Extend the bound request function with all properties from Jl.prototype and the instance
  DA.extend(boundRequestFunction, Jl.prototype, jlInstance, {
    allOwnKeys: true
  });

  // Extend the bound request function with all own properties from the instance
  DA.extend(boundRequestFunction, jlInstance, null, {
    allOwnKeys: true
  });

  // Add a .create method to generate a new request function with merged configurations
  boundRequestFunction.create = function createWithMergedConfig(overrideConfig) {
    // Merge the base configuration with the override configuration
    const mergedConfig = tC(baseConfig, overrideConfig);
    // Recursively create a new extended request function with the merged configuration
    return createRequestFunctionWithPrototypeExtensions(mergedConfig);
  };

  return boundRequestFunction;
}

module.exports = createRequestFunctionWithPrototypeExtensions;