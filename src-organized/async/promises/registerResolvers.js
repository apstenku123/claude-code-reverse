/**
 * Registers resolver functions for specific resolver types in the application'createInteractionAccessor resolver registry.
 *
 * This function associates the provided resolver handler with two different resolver types,
 * enabling the application to resolve dependencies or services using these types.
 *
 * @returns {void} This function does not return a value.
 */
function registerResolvers() {
  // Register the 'GraphQLQueryResolver' with the shared 'sharedResolverHandler'
  resolverRegistry.registerResolver(GraphQLQueryResolver, sharedResolverHandler);
  // Register the 'GraphQLMutationResolver' with the same shared handler
  resolverRegistry.registerResolver(GraphQLMutationResolver, sharedResolverHandler);
}

module.exports = registerResolvers;