/**
 * Registers custom resolvers with the resolver registry.
 *
 * This function registers two resolver types (QueryResolver and InputResolver)
 * with the provided resolver implementation (CustomResolverImplementation) using
 * the resolver registry (resolverRegistry). This setup allows the system to resolve
 * queries and inputs using the custom implementation.
 *
 * @returns {void} This function does not return a value.
 */
function registerCustomResolvers() {
  // Register the custom resolver for query type
  resolverRegistry.registerResolver(QueryResolver, CustomResolverImplementation);
  // Register the custom resolver for input type
  resolverRegistry.registerResolver(InputResolver, CustomResolverImplementation);
}

module.exports = registerCustomResolvers;