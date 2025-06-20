/**
 * Factory function to create an error resolver instance for a given target.
 *
 * @param {Object} target - The target object containing the scheme and other URI details.
 * @param {Object} config - Configuration object for the resolver.
 * @param {Object} subscription - Subscription or context for the resolver.
 * @returns {Object} An instance of the appropriate resolver for the given target.
 * @throws {Error} If no resolver can be created for the target'createInteractionAccessor scheme.
 */
function createErrorResolver(target, config, subscription) {
  // Check if the target has a defined scheme and if a resolver exists for that scheme
  if (target.scheme !== undefined && target.scheme in Rg) {
    // Instantiate and return the appropriate resolver
    return new Rg[target.scheme](target, config, subscription);
  } else {
    // Throw an error if no resolver could be created for the given target
    throw new Error(`No resolver could be created for target ${Qg1.uriToString(target)}`);
  }
}

module.exports = createErrorResolver;