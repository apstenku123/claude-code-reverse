/**
 * Registers default resolvers for the application.
 *
 * This function registers two resolver-handler pairs with the resolver registry.
 * It ensures that both the 'primaryResolver' and 'secondaryResolver' are handled by the same 'defaultResolverHandler'.
 *
 * @returns {void} This function does not return a value.
 */
function registerDefaultResolvers() {
  // Register the default handler for the primary resolver
  resolverRegistry.registerResolver(primaryResolver, defaultResolverHandler);
  // Register the default handler for the secondary resolver
  resolverRegistry.registerResolver(secondaryResolver, defaultResolverHandler);
}

module.exports = registerDefaultResolvers;