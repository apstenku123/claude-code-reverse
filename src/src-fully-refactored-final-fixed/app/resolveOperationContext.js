/**
 * Resolves the AWS operation context, extracting the operation name and region.
 * Throws an error if the region is not configured.
 *
 * @async
 * @param {Object} clientConfig - The client configuration object, expected to have a `region` property.
 * @param {Object} middlewareContext - The middleware context object, used to extract the operation name.
 * @param {any} subscription - (Unused) Subscription or additional context parameter.
 * @returns {Promise<{operation: string, region: string}>} An object containing the operation name and AWS region.
 * @throws {Error} If the region is not configured.
 */
async function resolveOperationContext(clientConfig, middlewareContext, subscription) {
  // Extract the operation name from the middleware context using getSmithyContext
  const operation = u_1.getSmithyContext(middlewareContext).operation;

  // Normalize the region provider and resolve isBlobOrFileLikeObject asynchronously
  const regionProvider = u_1.normalizeProvider(clientConfig.region);
  const region = (await regionProvider()) || (() => {
    throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
  })();

  return {
    operation,
    region
  };
}

module.exports = resolveOperationContext;