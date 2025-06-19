/**
 * Registers the 'dns' scheme and its resolver with the provided registry.
 *
 * This function sets up the DNS scheme by registering a resolver function for the 'dns' scheme
 * and then marking 'dns' as the default scheme in the registry. This is typically used in network
 * libraries or CLI tools that need to resolve DNS addresses using a custom resolver.
 *
 * @param {Object} schemeRegistry - The registry object responsible for managing schemes and resolvers.
 *   Must provide 'registerResolver' and 'registerDefaultScheme' methods.
 * @param {Function} dnsResolver - The resolver function to handle 'dns' scheme lookups.
 * @returns {void}
 */
function registerDnsSchemeAndResolver(schemeRegistry, dnsResolver) {
  // Register the DNS resolver for the 'dns' scheme
  schemeRegistry.registerResolver("dns", dnsResolver);
  // Set 'dns' as the default scheme
  schemeRegistry.registerDefaultScheme("dns");
}

module.exports = registerDnsSchemeAndResolver;