/**
 * Resolves the AWS SDK SigV4 configuration and normalizes the auth scheme preference.
 *
 * @param {Object} inputConfig - The input configuration object for AWS SDK SigV4.
 * @param {Array|undefined} [inputConfig.authSchemePreference] - Optional array of authentication scheme preferences.
 * @returns {Object} The resolved configuration object with a normalized authSchemePreference property.
 */
function resolveAwsSdkConfigWithAuthScheme(inputConfig) {
  // Resolve the base AWS SDK SigV4 configuration
  const resolvedConfig = tZ4.resolveAwsSdkSigV4Config(inputConfig);

  // Normalize the authSchemePreference property, defaulting to an empty array if undefined
  const normalizedAuthSchemePreference = kS1.normalizeProvider(
    inputConfig.authSchemePreference ?? []
  );

  // Merge the normalized authSchemePreference into the resolved configuration
  return Object.assign(resolvedConfig, {
    authSchemePreference: normalizedAuthSchemePreference
  });
}

module.exports = resolveAwsSdkConfigWithAuthScheme;