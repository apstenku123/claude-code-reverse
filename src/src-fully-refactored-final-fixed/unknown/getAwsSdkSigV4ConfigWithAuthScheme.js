/**
 * Resolves the AWS SDK SigV4 configuration from the provided input and
 * attaches a normalized authentication scheme preference provider.
 *
 * @param {object} inputConfig - The configuration object to resolve and enhance.
 * @returns {object} The resolved AWS SDK SigV4 configuration with normalized auth scheme preference.
 */
function getAwsSdkSigV4ConfigWithAuthScheme(inputConfig) {
  // Resolve the base AWS SDK SigV4 configuration from the input
  const resolvedConfig = IF4.resolveAwsSdkSigV4Config(inputConfig);

  // Normalize the authentication scheme preference provider
  const normalizedAuthSchemePreference = Q_1.normalizeProvider(
    inputConfig.authSchemePreference ?? []
  );

  // Merge the normalized auth scheme preference into the resolved config
  return Object.assign(resolvedConfig, {
    authSchemePreference: normalizedAuthSchemePreference
  });
}

module.exports = { getAwsSdkSigV4ConfigWithAuthScheme };