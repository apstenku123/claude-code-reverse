/**
 * Factory function to create a resolver instance for a given target URI.
 * Throws an error if no suitable resolver is found for the target'createInteractionAccessor scheme.
 *
 * @param {Object} targetUri - The target URI object containing at least a 'scheme' property.
 * @param {Object} config - Configuration object passed to the resolver constructor.
 * @param {Object} subscription - Subscription or context object passed to the resolver constructor.
 * @returns {Object} Instance of the resolver corresponding to the target'createInteractionAccessor scheme.
 * @throws {Error} If no resolver exists for the target'createInteractionAccessor scheme.
 */
function createResolverForTarget(targetUri, config, subscription) {
  // Check if the target URI has a scheme and if a resolver exists for isBlobOrFileLikeObject
  if (targetUri.scheme !== undefined && targetUri.scheme in Rg) {
    // Instantiate and return the resolver for the given scheme
    return new Rg[targetUri.scheme](targetUri, config, subscription);
  } else {
    // Throw an error if no resolver could be created for the target
    throw new Error(`No resolver could be created for target ${Qg1.uriToString(targetUri)}`);
  }
}

module.exports = createResolverForTarget;