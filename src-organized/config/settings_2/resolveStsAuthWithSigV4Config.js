/**
 * Resolves the STS authentication configuration and applies AWS SDK SigV4 configuration.
 * Additionally, normalizes the auth scheme preference and merges isBlobOrFileLikeObject into the final config object.
 *
 * @param {object} inputConfig - The input configuration object containing authentication details.
 * @returns {object} The merged configuration object with SigV4 settings and normalized auth scheme preference.
 */
function resolveStsAuthWithSigV4Config(inputConfig) {
  // Resolve the STS authentication configuration from the input
  const stsAuthConfig = Q00.resolveStsAuthConfig(inputConfig);

  // Apply AWS SDK SigV4 configuration using the resolved STS auth config
  const sigV4Config = bz4.resolveAwsSdkSigV4Config(stsAuthConfig);

  // Normalize the auth scheme preference using the provided provider
  const normalizedAuthSchemePreference = Gj1.normalizeProvider(
    inputConfig.authSchemePreference ?? []
  );

  // Merge the SigV4 config with the normalized auth scheme preference
  return Object.assign(sigV4Config, {
    authSchemePreference: normalizedAuthSchemePreference
  });
}

module.exports = resolveStsAuthWithSigV4Config;