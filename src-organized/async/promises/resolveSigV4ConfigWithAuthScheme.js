/**
 * Resolves the AWS SDK SigV4 configuration and augments isBlobOrFileLikeObject with a normalized auth scheme preference.
 *
 * @param {object} inputConfig - The configuration object to resolve and augment.
 * @returns {object} The resolved configuration with a normalized authSchemePreference property.
 */
function resolveSigV4ConfigWithAuthScheme(inputConfig) {
  // Resolve the base AWS SDK SigV4 configuration from the input
  const resolvedConfig = _K4.resolveAwsSdkSigV4Config(inputConfig);

  // Normalize the authSchemePreference property (default to empty array if undefined)
  const normalizedAuthSchemePreference = u_1.normalizeProvider(
    inputConfig.authSchemePreference ?? []
  );

  // Merge the normalized authSchemePreference into the resolved config
  return Object.assign(resolvedConfig, {
    authSchemePreference: normalizedAuthSchemePreference
  });
}

module.exports = { resolveSigV4ConfigWithAuthScheme };