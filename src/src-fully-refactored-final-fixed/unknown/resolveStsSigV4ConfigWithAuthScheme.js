/**
 * Resolves the STS authentication configuration, applies AWS SDK SigV4 configuration,
 * and normalizes the authentication scheme preference.
 *
 * @param {object} inputConfig - The initial configuration object containing authentication settings.
 * @returns {object} The resolved configuration object with SigV4 settings and normalized auth scheme preference.
 */
function resolveStsSigV4ConfigWithAuthScheme(inputConfig) {
  // Resolve the STS authentication configuration from the input
  const stsAuthConfig = Q00.resolveStsAuthConfig(inputConfig);

  // Apply AWS SDK SigV4 configuration based on the resolved STS config
  const sigV4Config = bz4.resolveAwsSdkSigV4Config(stsAuthConfig);

  // Normalize the authentication scheme preference, defaulting to an empty array if not provided
  const normalizedAuthSchemePreference = Gj1.normalizeProvider(
    inputConfig.authSchemePreference ?? []
  );

  // Merge the SigV4 config with the normalized auth scheme preference
  return Object.assign(sigV4Config, {
    authSchemePreference: normalizedAuthSchemePreference
  });
}

module.exports = resolveStsSigV4ConfigWithAuthScheme;